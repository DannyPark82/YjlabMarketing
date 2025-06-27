import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import { 
  insertContentSectionSchema,
  insertMediaFileSchema,
  insertContactSubmissionSchema,
  insertSiteSettingSchema 
} from "@shared/schema";
import multer from "multer";
import path from "path";
import { promises as fs } from "fs";

const upload = multer({
  storage: multer.diskStorage({
    destination: async (req, file, cb) => {
      const uploadDir = path.join(process.cwd(), 'uploads');
      await fs.mkdir(uploadDir, { recursive: true });
      cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const ext = path.extname(file.originalname);
      cb(null, file.fieldname + '-' + uniqueSuffix + ext);
    }
  }),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp|svg/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth middleware
  await setupAuth(app);

  // Serve uploaded files
  app.use('/uploads', (req, res, next) => {
    const uploadPath = path.join(process.cwd(), 'uploads');
    app.use('/uploads', require('express').static(uploadPath));
    next();
  });

  // Auth routes
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Public content routes
  app.get("/api/content/sections", async (req, res) => {
    try {
      const sections = await storage.getContentSections();
      res.json(sections);
    } catch (error) {
      console.error("Error fetching content sections:", error);
      res.status(500).json({ message: "Failed to fetch content sections" });
    }
  });

  app.get("/api/content/sections/:sectionKey", async (req, res) => {
    try {
      const section = await storage.getContentSection(req.params.sectionKey);
      if (!section) {
        return res.status(404).json({ message: "Section not found" });
      }
      res.json(section);
    } catch (error) {
      console.error("Error fetching content section:", error);
      res.status(500).json({ message: "Failed to fetch content section" });
    }
  });

  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSubmissionSchema.parse(req.body);
      const submission = await storage.createContactSubmission(validatedData);
      res.status(201).json(submission);
    } catch (error) {
      console.error("Error creating contact submission:", error);
      res.status(400).json({ message: "Invalid contact form data" });
    }
  });

  // Public site settings
  app.get("/api/settings/public", async (req, res) => {
    try {
      const settings = await storage.getSiteSettings();
      // Filter only public settings
      const publicSettings = settings.filter(s => 
        ['site_title', 'site_description', 'contact_email', 'contact_phone'].includes(s.settingKey)
      );
      res.json(publicSettings);
    } catch (error) {
      console.error("Error fetching public settings:", error);
      res.status(500).json({ message: "Failed to fetch settings" });
    }
  });

  // Protected admin routes
  app.get("/api/admin/content/sections", isAuthenticated, async (req, res) => {
    try {
      const sections = await storage.getContentSections();
      res.json(sections);
    } catch (error) {
      console.error("Error fetching content sections:", error);
      res.status(500).json({ message: "Failed to fetch content sections" });
    }
  });

  app.post("/api/admin/content/sections", isAuthenticated, async (req, res) => {
    try {
      const validatedData = insertContentSectionSchema.parse(req.body);
      const section = await storage.createContentSection(validatedData);
      res.status(201).json(section);
    } catch (error) {
      console.error("Error creating content section:", error);
      res.status(400).json({ message: "Invalid section data" });
    }
  });

  app.put("/api/admin/content/sections/:id", isAuthenticated, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const validatedData = insertContentSectionSchema.parse(req.body);
      const section = await storage.updateContentSection(id, validatedData);
      
      if (!section) {
        return res.status(404).json({ message: "Section not found" });
      }
      
      res.json(section);
    } catch (error) {
      console.error("Error updating content section:", error);
      res.status(400).json({ message: "Invalid section data" });
    }
  });

  app.delete("/api/admin/content/sections/:id", isAuthenticated, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteContentSection(id);
      
      if (!success) {
        return res.status(404).json({ message: "Section not found" });
      }
      
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting content section:", error);
      res.status(500).json({ message: "Failed to delete section" });
    }
  });

  // Media management routes
  app.get("/api/admin/media", isAuthenticated, async (req, res) => {
    try {
      const files = await storage.getMediaFiles();
      res.json(files);
    } catch (error) {
      console.error("Error fetching media files:", error);
      res.status(500).json({ message: "Failed to fetch media files" });
    }
  });

  app.post("/api/admin/media/upload", isAuthenticated, upload.single('file'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      const fileUrl = `/uploads/${req.file.filename}`;
      
      const mediaFile = await storage.createMediaFile({
        filename: req.file.filename,
        originalName: req.file.originalname,
        mimeType: req.file.mimetype,
        size: req.file.size,
        url: fileUrl,
        alt: req.body.alt || "",
      });

      res.status(201).json(mediaFile);
    } catch (error) {
      console.error("Error uploading file:", error);
      res.status(500).json({ message: "Failed to upload file" });
    }
  });

  app.delete("/api/admin/media/:id", isAuthenticated, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const mediaFile = await storage.getMediaFile(id);
      
      if (!mediaFile) {
        return res.status(404).json({ message: "File not found" });
      }

      // Delete physical file
      const filePath = path.join(process.cwd(), 'uploads', mediaFile.filename);
      try {
        await fs.unlink(filePath);
      } catch (fileError) {
        console.warn("Could not delete physical file:", fileError);
      }

      const success = await storage.deleteMediaFile(id);
      if (!success) {
        return res.status(404).json({ message: "File not found" });
      }

      res.status(204).send();
    } catch (error) {
      console.error("Error deleting media file:", error);
      res.status(500).json({ message: "Failed to delete file" });
    }
  });

  // Contact submissions management
  app.get("/api/admin/contact", isAuthenticated, async (req, res) => {
    try {
      const submissions = await storage.getContactSubmissions();
      res.json(submissions);
    } catch (error) {
      console.error("Error fetching contact submissions:", error);
      res.status(500).json({ message: "Failed to fetch contact submissions" });
    }
  });

  app.put("/api/admin/contact/:id/read", isAuthenticated, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.markContactSubmissionAsRead(id);
      
      if (!success) {
        return res.status(404).json({ message: "Submission not found" });
      }
      
      res.status(204).send();
    } catch (error) {
      console.error("Error marking submission as read:", error);
      res.status(500).json({ message: "Failed to update submission" });
    }
  });

  // Site settings management
  app.get("/api/admin/settings", isAuthenticated, async (req, res) => {
    try {
      const settings = await storage.getSiteSettings();
      res.json(settings);
    } catch (error) {
      console.error("Error fetching settings:", error);
      res.status(500).json({ message: "Failed to fetch settings" });
    }
  });

  app.put("/api/admin/settings/:key", isAuthenticated, async (req, res) => {
    try {
      const key = req.params.key;
      const validatedData = insertSiteSettingSchema.parse({
        settingKey: key,
        ...req.body
      });
      
      const setting = await storage.upsertSiteSetting(validatedData);
      res.json(setting);
    } catch (error) {
      console.error("Error updating setting:", error);
      res.status(400).json({ message: "Invalid setting data" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
