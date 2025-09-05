import { users, type User, type InsertUser, RsvpEntry, InsertRsvp } from "@shared/schema";

export interface IStorage {
  // User methods (keep existing methods)
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // RSVP methods for open house
  createRsvp(rsvp: InsertRsvp): Promise<RsvpEntry>;
  getRsvps(): Promise<RsvpEntry[]>;
  getRsvpById(id: number): Promise<RsvpEntry | undefined>;
  getRsvpByEmail(email: string): Promise<RsvpEntry | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private rsvps: Map<number, RsvpEntry>;
  userCurrentId: number;
  rsvpCurrentId: number;

  constructor() {
    this.users = new Map();
    this.rsvps = new Map();
    this.userCurrentId = 1;
    this.rsvpCurrentId = 1;
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // RSVP methods
  async createRsvp(insertRsvp: InsertRsvp): Promise<RsvpEntry> {
    const id = this.rsvpCurrentId++;
    const createdAt = new Date().toISOString();
    // Ensure message and subscribe are properly defaulted if not provided
    const rsvp: RsvpEntry = { 
      ...insertRsvp, 
      id, 
      createdAt,
      message: insertRsvp.message ?? null,
      subscribe: insertRsvp.subscribe ?? false
    };
    this.rsvps.set(id, rsvp);
    return rsvp;
  }

  async getRsvps(): Promise<RsvpEntry[]> {
    return Array.from(this.rsvps.values());
  }

  async getRsvpById(id: number): Promise<RsvpEntry | undefined> {
    return this.rsvps.get(id);
  }

  async getRsvpByEmail(email: string): Promise<RsvpEntry | undefined> {
    return Array.from(this.rsvps.values()).find(
      (rsvp) => rsvp.email === email
    );
  }
}

export const storage = new MemStorage();
