import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertRsvpSchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import * as fs from 'fs';
import * as path from 'path';
import * as https from 'https';
import * as http from 'http';

// Helper function to deep merge objects while preserving all existing fields
function deepMerge(target: any, source: any): any {
  if (source === null || source === undefined) {
    return target;
  }
  
  if (typeof source !== 'object' || Array.isArray(source)) {
    return source;
  }
  
  if (typeof target !== 'object' || Array.isArray(target)) {
    return source;
  }
  
  const result = { ...target };
  
  for (const key in source) {
    if (source.hasOwnProperty(key)) {
      if (typeof source[key] === 'object' && source[key] !== null && !Array.isArray(source[key])) {
        result[key] = deepMerge(target[key] || {}, source[key]);
      } else {
        result[key] = source[key];
      }
    }
  }
  
  return result;
}

// Helper function to send config to external endpoint
async function sendConfigToExternalEndpoint(configContent: string, section: string): Promise<void> {
  // Your n8n webhook endpoint
  const externalEndpoint = 'https://n8n.salesgenius.co/webhook/listingsiteupdate';
  
  console.log(`🚀 Attempting to send ${section} config to webhook: ${externalEndpoint}`);
  
  try {
    const configJson = await parseConfigToJson(configContent);
    
    const payload = {
      timestamp: new Date().toISOString(),
      section: section,
      action: 'config_updated',
      source: 'openhaus_admin',
      configFile: configContent,
      configJson: configJson,
      // Extract key property info for easy access
      property: configJson.property || null,
      contactInfo: configJson.contactInfo || null,
      openHouseDetails: configJson.openHouseDetails || null,
      packageItems: configJson.packageItems || null
    };
    
    console.log(`📋 Payload size: ${JSON.stringify(payload).length} characters`);
    console.log(`📋 Agent repo field: ${configJson.contactInfo?.agent?.repo || 'not found'}`);
    
    const url = new URL(externalEndpoint);
    const isHttps = url.protocol === 'https:';
    const httpModule = isHttps ? https : http;
    
    const postData = JSON.stringify(payload);
    
    const options = {
      hostname: url.hostname,
      port: url.port || (isHttps ? 443 : 80),
      path: url.pathname + url.search,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData),
        'User-Agent': 'OpenHaus-Config-Sender/1.0'
      }
    };
    
    return new Promise((resolve, reject) => {
      const req = httpModule.request(options, (res) => {
        console.log(`n8n webhook response: ${res.statusCode} ${res.statusMessage}`);
        
        let responseData = '';
        res.on('data', (chunk) => {
          responseData += chunk;
        });
        
        res.on('end', () => {
          if (res.statusCode && res.statusCode >= 200 && res.statusCode < 300) {
            console.log(`✅ Successfully sent ${section} config to n8n webhook`);
            resolve();
          } else {
            console.error(`❌ n8n webhook returned error: ${res.statusCode} - ${responseData}`);
            reject(new Error(`n8n webhook error: ${res.statusCode}`));
          }
        });
      });
      
      req.on('error', (error) => {
        console.error('❌ Error sending config to n8n webhook:', error);
        reject(error);
      });
      
      req.write(postData);
      req.end();
    });
    
  } catch (error) {
    console.error('Failed to send config to external endpoint:', error);
    // Don't throw error - we don't want to fail the main config update if external endpoint fails
  }
}

// Helper function to parse the JavaScript config file to JSON
async function parseConfigToJson(configContent: string): Promise<Record<string, any>> {
  try {
    // Create a temporary module and import it using dynamic import
    const tempFilePath = path.join(process.cwd(), 'temp-config.js');
    
    // Write the config content to a temporary file
    fs.writeFileSync(tempFilePath, configContent);
    
    // Use dynamic import to load the module
    const configModule = await import(`file://${tempFilePath}`);
    
    // Clean up the temporary file
    fs.unlinkSync(tempFilePath);
    
    // Extract all exports
    const exports: Record<string, any> = {};
    for (const key of Object.keys(configModule)) {
      if (key !== '__esModule') {
        exports[key] = configModule[key];
        console.log(`✅ Parsed ${key}:`, typeof exports[key]);
      }
    }
    
    console.log(`📋 Successfully parsed ${Object.keys(exports).length} config sections`);
    return exports;
  } catch (error) {
    console.error('Error parsing config to JSON:', error);
    return {};
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  // API endpoint for RSVP form submission
  app.post("/api/rsvp", async (req: Request, res: Response) => {
    try {
      // Validate form data using the zod schema
      const validatedData = insertRsvpSchema.parse(req.body);
      
      // Check if the user already RSVP'd with the same email
      const existingRsvp = await storage.getRsvpByEmail(validatedData.email);
      
      if (existingRsvp) {
        // Update the existing RSVP
        const updatedRsvp = await storage.createRsvp({
          ...validatedData,
        });
        return res.status(200).json({
          message: "Your RSVP has been updated",
          rsvp: updatedRsvp
        });
      }
      
      // Create a new RSVP entry
      const rsvp = await storage.createRsvp(validatedData);
      
      return res.status(201).json({
        message: "Thank you for your RSVP! We look forward to seeing you at the open house.",
        rsvp
      });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ 
          message: "Validation error", 
          errors: validationError.message 
        });
      }
      
      console.error("Error processing RSVP:", error);
      return res.status(500).json({ 
        message: "An error occurred while processing your RSVP" 
      });
    }
  });

  // Get all RSVPs (could be protected in a real app)
  app.get("/api/rsvp", async (_req: Request, res: Response) => {
    try {
      const rsvps = await storage.getRsvps();
      return res.status(200).json(rsvps);
    } catch (error) {
      console.error("Error retrieving RSVPs:", error);
      return res.status(500).json({ 
        message: "An error occurred while retrieving RSVPs" 
      });
    }
  });

  // Get RSVP by ID
  app.get("/api/rsvp/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
      }
      
      const rsvp = await storage.getRsvpById(id);
      if (!rsvp) {
        return res.status(404).json({ message: "RSVP not found" });
      }
      
      return res.status(200).json(rsvp);
    } catch (error) {
      console.error("Error retrieving RSVP:", error);
      return res.status(500).json({ 
        message: "An error occurred while retrieving the RSVP" 
      });
    }
  });

  // Update site configuration
  app.post("/api/config/update", async (req: Request, res: Response) => {
    try {
      const { section, config } = req.body;
      
      console.log(`Updating configuration for section: ${section}`);
      console.log('Configuration data received:', JSON.stringify(config, null, 2));
      
      if (!section || !config) {
        console.error("Missing required fields: section or config");
        return res.status(400).json({
          message: "Missing required fields: section and config"
        });
      }
      
      // Path to the siteConfig.js file
      const configFilePath = path.resolve('./client/src/config/siteConfig.js');
      console.log(`Config file path: ${configFilePath}`);
      
      // Create a completely new configuration file with all the updated values
      // This is safer than doing regex replacements on the existing file
      
      // First, get all existing configs from the module
      let allConfigs: Record<string, any> = {};
      
      try {
        // Read the current config file to get the latest data
        const currentConfigContent = fs.readFileSync(configFilePath, 'utf8');
        console.log(`📖 Reading current config file: ${configFilePath}`);
        
        // Parse the JavaScript file to extract the exports
        allConfigs = await parseConfigToJson(currentConfigContent);
        console.log(`📋 Loaded existing config with keys:`, Object.keys(allConfigs));
        
        // Override with the new values, but preserve ALL existing fields
        for (const key of Object.keys(config)) {
          if (allConfigs[key] && typeof allConfigs[key] === 'object' && !Array.isArray(allConfigs[key])) {
            // Deep merge to preserve ALL existing fields
            allConfigs[key] = deepMerge(allConfigs[key], config[key]);
            console.log(`🔒 Preserved all existing ${key} fields`);
          } else {
            allConfigs[key] = config[key];
          }
        }
      } catch (err) {
        console.error("Error loading existing config:", err);
        // If we can't load the module, just use the provided config
        allConfigs = { ...config };
      }
      
      // Read the current file for backup purposes
      let originalContent = "";
      try {
        originalContent = fs.readFileSync(configFilePath, 'utf8');
        
        // Create a backup of the original file
        const backupPath = `${configFilePath}.backup`;
        fs.writeFileSync(backupPath, originalContent);
        console.log(`Created backup at: ${backupPath}`);
      } catch (err) {
        console.warn("Could not create backup, file might not exist yet:", err);
      }
      
      // Helper function to format a value as a JS string
      const formatValue = (val: any, indent = 2): string => {
        if (val === null) return 'null';
        if (val === undefined) return 'undefined';
        
        if (typeof val === 'string') {
          return `"${val.replace(/"/g, '\\"')}"`;
        }
        
        if (typeof val === 'number' || typeof val === 'boolean') {
          return String(val);
        }
        
        if (Array.isArray(val)) {
          if (val.length === 0) return '[]';
          
          const innerIndent = ' '.repeat(indent + 2);
          const items = val.map(item => 
            `${innerIndent}${formatValue(item, indent + 2)}`
          ).join(',\n');
          
          return `[\n${items}\n${' '.repeat(indent)}]`;
        }
        
        if (typeof val === 'object') {
          const keys = Object.keys(val);
          if (keys.length === 0) return '{}';
          
          const innerIndent = ' '.repeat(indent + 2);
          const items = keys.map(key => 
            `${innerIndent}${key}: ${formatValue(val[key], indent + 2)}`
          ).join(',\n');
          
          return `{\n${items}\n${' '.repeat(indent)}}`;
        }
        
        return String(val);
      };
      
      // Generate the new file content
      let newFileContent = `/**
 * Site Configuration
 * This file contains all configurable content for the website
 * Last updated: ${new Date().toISOString()}
 */\n\n`;
      
      // Add each configuration section
      for (const [key, value] of Object.entries(allConfigs)) {
        newFileContent += `// ${key} configuration\n`;
        newFileContent += `export const ${key} = ${formatValue(value, 2)};\n\n`;
      }
      
      // Write the new file
      fs.writeFileSync(configFilePath, newFileContent);
      console.log(`Successfully wrote updated configuration to file`);
      
      // Send the complete config file to external endpoint if configured
      console.log(`📤 About to send config to webhook for section: ${section}`);
      try {
        await sendConfigToExternalEndpoint(newFileContent, section);
        console.log(`✅ Config webhook call completed for section: ${section}`);
      } catch (webhookError) {
        console.error(`❌ Webhook failed for section ${section}:`, webhookError);
        // Don't fail the main operation if webhook fails
      }
      
      res.status(200).json({
        message: `Successfully updated ${section} configuration`
      });
    } catch (error) {
      console.error("Error updating configuration:", error);
      
      // Try to restore from backup if possible
      try {
        const configFilePath = path.resolve('./client/src/config/siteConfig.js');
        const backupPath = `${configFilePath}.backup`;
        
        if (fs.existsSync(backupPath)) {
          const backupContent = fs.readFileSync(backupPath, 'utf8');
          fs.writeFileSync(configFilePath, backupContent);
          console.log("Restored configuration from backup");
        }
      } catch (restoreError) {
        console.error("Failed to restore from backup:", restoreError);
      }
      
      res.status(500).json({
        message: "Failed to update configuration. Please try again later."
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
