import { pgTable, text, serial, integer, boolean, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(), // "art", "game", "interactive"
  type: text("type").notNull(), // "Digital Art", "3D Render", "Indie Game", etc.
  imageUrl: text("image_url").notNull(),
  tags: json("tags").$type<string[]>().notNull().default([]),
  year: integer("year").notNull(),
  featured: boolean("featured").notNull().default(false),
  externalUrl: text("external_url"),
  downloadUrl: text("download_url"),
  views: integer("views").notNull().default(0),
  downloads: integer("downloads").notNull().default(0),
  rating: integer("rating").notNull().default(0), // out of 5
});

export const contacts = pgTable("contacts", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  projectType: text("project_type").notNull(),
  message: text("message").notNull(),
  createdAt: text("created_at").notNull(),
});

export const insertProjectSchema = createInsertSchema(projects).omit({
  id: true,
  views: true,
  downloads: true,
  rating: true,
});

export const insertContactSchema = createInsertSchema(contacts).omit({
  id: true,
  createdAt: true,
});

export type InsertProject = z.infer<typeof insertProjectSchema>;
export type Project = typeof projects.$inferSelect;
export type InsertContact = z.infer<typeof insertContactSchema>;
export type Contact = typeof contacts.$inferSelect;
