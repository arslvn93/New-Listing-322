const WEBHOOK_URL = process.env.N8N_WEBHOOK_URL || 'https://n8n.salesgenius.co/webhook/listingsiteupdate';

exports.handler = async (event) => {
  const baseHeaders = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: baseHeaders };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers: baseHeaders, body: JSON.stringify({ message: 'Method Not Allowed' }) };
  }

  try {
    const { section, config } = JSON.parse(event.body || '{}');

    if (!section || !config) {
      return {
        statusCode: 400,
        headers: baseHeaders,
        body: JSON.stringify({ message: 'Missing required fields: section and config' })
      };
    }

    const payload = {
      timestamp: new Date().toISOString(),
      section,
      action: 'config_updated',
      source: 'openhaus_admin_netlify_fn',
      configJson: config,
      property: config.property || null,
      contactInfo: config.contactInfo || null,
      openHouseDetails: config.openHouseDetails || null,
      packageItems: config.packageItems || null
    };

    const resp = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'OpenHaus-Config-Sender/1.0'
      },
      body: JSON.stringify(payload)
    });

    const text = await resp.text();

    if (!resp.ok) {
      return {
        statusCode: 502,
        headers: baseHeaders,
        body: JSON.stringify({ message: 'Webhook error', status: resp.status, response: text })
      };
    }

    return {
      statusCode: 200,
      headers: baseHeaders,
      body: JSON.stringify({ message: `Successfully updated ${section} configuration` })
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: baseHeaders,
      body: JSON.stringify({ message: 'Failed to update configuration. Please try again later.' })
    };
  }
};