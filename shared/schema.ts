import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// RSVP form data schema
export const rsvpEntries = pgTable("rsvp_entries", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  message: text("message"),
  subscribe: boolean("subscribe").default(false),
  createdAt: text("created_at").notNull().default(new Date().toISOString()),
});

export const insertRsvpSchema = createInsertSchema(rsvpEntries).omit({
  id: true,
  createdAt: true,
});

export type InsertRsvp = z.infer<typeof insertRsvpSchema>;
export type RsvpEntry = typeof rsvpEntries.$inferSelect;

// Keep the users table (required by existing code)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
