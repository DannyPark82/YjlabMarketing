import {
  users,
  type User,
  type UpsertUser,
  contentSections,
  type ContentSection,
  type InsertContentSection,
  mediaFiles,
  type MediaFile,
  type InsertMediaFile,
  contactSubmissions,
  type ContactSubmission,
  type InsertContactSubmission,
  siteSettings,
  type SiteSetting,
  type InsertSiteSetting,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";

// Interface for storage operations
export interface IStorage {
  // User operations (mandatory for Replit Auth)
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  
  // Content sections
  getContentSections(): Promise<ContentSection[]>;
  getContentSection(sectionKey: string): Promise<ContentSection | undefined>;
  createContentSection(section: InsertContentSection): Promise<ContentSection>;
  updateContentSection(id: number, section: Partial<InsertContentSection>): Promise<ContentSection | undefined>;
  deleteContentSection(id: number): Promise<boolean>;
  
  // Media files
  getMediaFiles(): Promise<MediaFile[]>;
  getMediaFile(id: number): Promise<MediaFile | undefined>;
  createMediaFile(file: InsertMediaFile): Promise<MediaFile>;
  deleteMediaFile(id: number): Promise<boolean>;
  
  // Contact submissions
  getContactSubmissions(): Promise<ContactSubmission[]>;
  createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission>;
  markContactSubmissionAsRead(id: number): Promise<boolean>;
  
  // Site settings
  getSiteSettings(): Promise<SiteSetting[]>;
  getSiteSetting(key: string): Promise<SiteSetting | undefined>;
  upsertSiteSetting(setting: InsertSiteSetting): Promise<SiteSetting>;
}

export class DatabaseStorage implements IStorage {
  // User operations (mandatory for Replit Auth)
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  // Content sections
  async getContentSections(): Promise<ContentSection[]> {
    return await db.select().from(contentSections).orderBy(contentSections.createdAt);
  }

  async getContentSection(sectionKey: string): Promise<ContentSection | undefined> {
    const [section] = await db
      .select()
      .from(contentSections)
      .where(eq(contentSections.sectionKey, sectionKey));
    return section;
  }

  async createContentSection(section: InsertContentSection): Promise<ContentSection> {
    const [created] = await db
      .insert(contentSections)
      .values(section)
      .returning();
    return created;
  }

  async updateContentSection(id: number, section: Partial<InsertContentSection>): Promise<ContentSection | undefined> {
    const [updated] = await db
      .update(contentSections)
      .set({ ...section, updatedAt: new Date() })
      .where(eq(contentSections.id, id))
      .returning();
    return updated;
  }

  async deleteContentSection(id: number): Promise<boolean> {
    const result = await db
      .delete(contentSections)
      .where(eq(contentSections.id, id));
    return result.rowCount > 0;
  }

  // Media files
  async getMediaFiles(): Promise<MediaFile[]> {
    return await db.select().from(mediaFiles).orderBy(desc(mediaFiles.createdAt));
  }

  async getMediaFile(id: number): Promise<MediaFile | undefined> {
    const [file] = await db
      .select()
      .from(mediaFiles)
      .where(eq(mediaFiles.id, id));
    return file;
  }

  async createMediaFile(file: InsertMediaFile): Promise<MediaFile> {
    const [created] = await db
      .insert(mediaFiles)
      .values(file)
      .returning();
    return created;
  }

  async deleteMediaFile(id: number): Promise<boolean> {
    const result = await db
      .delete(mediaFiles)
      .where(eq(mediaFiles.id, id));
    return result.rowCount > 0;
  }

  // Contact submissions
  async getContactSubmissions(): Promise<ContactSubmission[]> {
    return await db.select().from(contactSubmissions).orderBy(desc(contactSubmissions.createdAt));
  }

  async createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission> {
    const [created] = await db
      .insert(contactSubmissions)
      .values(submission)
      .returning();
    return created;
  }

  async markContactSubmissionAsRead(id: number): Promise<boolean> {
    const result = await db
      .update(contactSubmissions)
      .set({ isRead: true })
      .where(eq(contactSubmissions.id, id));
    return result.rowCount > 0;
  }

  // Site settings
  async getSiteSettings(): Promise<SiteSetting[]> {
    return await db.select().from(siteSettings);
  }

  async getSiteSetting(key: string): Promise<SiteSetting | undefined> {
    const [setting] = await db
      .select()
      .from(siteSettings)
      .where(eq(siteSettings.settingKey, key));
    return setting;
  }

  async upsertSiteSetting(setting: InsertSiteSetting): Promise<SiteSetting> {
    const [upserted] = await db
      .insert(siteSettings)
      .values(setting)
      .onConflictDoUpdate({
        target: siteSettings.settingKey,
        set: {
          settingValue: setting.settingValue,
          description: setting.description,
          updatedAt: new Date(),
        },
      })
      .returning();
    return upserted;
  }
}

export const storage = new DatabaseStorage();
