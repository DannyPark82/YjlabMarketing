# YJLAB Marketing Website

## Overview

YJLAB is a full-stack web application for a Korean marketing company specializing in fashion business consulting. The application features a public marketing website with content management capabilities and an admin dashboard for authenticated users. Built with React frontend, Express.js backend, and PostgreSQL database using Drizzle ORM.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **UI Components**: Shadcn/ui component library with Radix UI primitives
- **Styling**: Tailwind CSS with custom brand colors (orange, teal, gray palette)
- **State Management**: TanStack Query for server state management
- **Forms**: React Hook Form with Zod validation
- **Build Tool**: Vite with hot module replacement

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Authentication**: Replit Auth with OpenID Connect integration
- **Session Management**: Express sessions with PostgreSQL storage
- **File Uploads**: Multer middleware for image handling
- **API Design**: RESTful API structure with protected admin routes

### Database Architecture
- **Database**: PostgreSQL with Neon serverless connection
- **ORM**: Drizzle ORM with type-safe queries
- **Schema**: Structured tables for users, sessions, content sections, media files, contact submissions, and site settings

## Key Components

### Public Website Features
- **Hero Section**: Dynamic content with company branding and achievements
- **About Section**: Problem statement and company differentiation
- **Achievements Section**: Quantified business results and success metrics
- **Services Section**: Detailed service offerings for fashion brands
- **Contact Section**: Contact form with validation and submission handling
- **Responsive Design**: Mobile-first approach with smooth scrolling navigation

### Admin Dashboard
- **Content Management**: CRUD operations for website content sections
- **Media Management**: Image upload, organization, and deletion
- **Contact Management**: View and manage contact form submissions
- **Protected Routes**: Authentication-required admin interface

### Content Management System
- **Dynamic Sections**: Configurable content sections with metadata
- **Rich Text Support**: Title, subtitle, and content fields for flexibility
- **Section Keys**: Predefined section identifiers (hero, achievements, services)
- **Active/Inactive Toggle**: Content visibility control

## Data Flow

### Public Content Flow
1. User visits public website
2. React components fetch content sections via TanStack Query
3. Server queries PostgreSQL via Drizzle ORM
4. Content renders dynamically based on database content
5. Contact form submissions stored in database

### Admin Content Flow
1. Admin user authenticates via Replit Auth
2. Admin dashboard loads with protected routes
3. Content CRUD operations update database immediately
4. Media uploads processed via Multer and stored locally
5. Changes reflect on public site instantly

### Authentication Flow
1. User initiates login via `/api/login`
2. Redirects to Replit OIDC provider
3. Authentication callback validates tokens
4. User session stored in PostgreSQL
5. Subsequent requests authenticated via session cookies

## External Dependencies

### Core Dependencies
- **Database**: Neon PostgreSQL serverless database
- **Authentication**: Replit Auth OIDC integration
- **UI Components**: Radix UI primitives for accessibility
- **File Storage**: Local file system for uploaded images
- **Email**: Contact form submissions (database storage only)

### Development Tools
- **TypeScript**: Type safety across frontend and backend
- **ESBuild**: Fast production builds
- **Vite**: Development server with HMR
- **Drizzle Kit**: Database migrations and schema management

## Deployment Strategy

### Development Environment
- **Runtime**: Node.js 20 with ES modules
- **Development Server**: Vite dev server with Express API proxy
- **Database**: Neon PostgreSQL with connection pooling
- **File Storage**: Local uploads directory

### Production Build
- **Frontend**: Vite builds optimized static assets
- **Backend**: ESBuild bundles Express server
- **Deployment**: Replit autoscale deployment target
- **Port Configuration**: Server runs on port 5000, exposed on port 80

### Environment Configuration
- **DATABASE_URL**: PostgreSQL connection string
- **SESSION_SECRET**: Session encryption key
- **REPLIT_DOMAINS**: Allowed domains for OIDC
- **ISSUER_URL**: OIDC provider URL

## Changelog

```
Changelog:
- June 27, 2025. Initial setup
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```