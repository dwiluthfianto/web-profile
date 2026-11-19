# Personal Web Profile & Portfolio CMS

A modern, customizable personal portfolio, blog, and CMS built with **Next.js 16 (App Router)**, **Neon Postgres**, **Neon Auth (Managed Better Auth)**, **Neon Object Storage (S3-compatible)**, **Tailwind CSS v4**, and **Lexical Rich Text Editor**.

Anyone can clone this repository, connect their own Neon project in a few commands, and manage their profile, featured projects, career experiences, skills, blog posts, and contact messages directly from the built-in admin UI—without hardcoding content in source files.

---

## ✨ Features

- **In-Place Admin CMS:** Log in via `/auth` (Email/Password or Google OAuth) to add, edit, or delete Projects, Blog Posts, Career Experiences, Skills, and Profile details directly from the UI.
- **Rich Text Blog Engine:** Powered by **Lexical Editor** with code blocks, tables, lists, links, and markdown shortcuts.
- **All-in-One Neon Backend:**
  - **Neon Postgres (`@neondatabase/serverless`):** Stores profile bio, projects, blogs, experiences, skills, and contact messages.
  - **Neon Object Storage (`files-sdk/neon`):** S3-compatible bucket (`uploads`) that branches alongside your database for project thumbnails, skill icons, avatar, and logo.
  - **Neon Auth (`@neon/auth`):** Managed Better Auth stored directly in the `neon_auth` Postgres schema—no hardcoded credentials in `.env`.
- **Contact Form + Email Notifications:** Visitors can send messages stored in Neon Postgres and viewable in `/account`, with optional SMTP email notifications via Nodemailer.
- **Dark / Light Theme & Responsive UI:** Built with Radix UI primitives, shadcn/ui components, Motion animations, and Geist typography.

---

## 🛠 Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Framework** | Next.js 16 (App Router, Server Actions, Turbopack), React 19, TypeScript |
| **Database** | Neon Serverless Postgres (`@neondatabase/serverless`) |
| **Authentication** | Neon Auth / Managed Better Auth (`@neon/auth`) |
| **File Storage** | Neon Object Storage (`files-sdk` + `@aws-sdk/client-s3`) |
| **Data Fetching & Forms** | TanStack React Query v5, React Hook Form, Zod |
| **Styling & UI** | Tailwind CSS v4, Radix UI, Lucide Icons, Motion |

---

## 🚀 Quick Start (For New Users)

### 1. Clone & Install Dependencies

```bash
git clone https://github.com/dwiluthfianto/web-profile.git
cd web-profile
pnpm install
```

### 2. Provision Your Neon Backend (Postgres + Auth + Object Storage)

This repository includes a declarative [`neon.ts`](./neon.ts) config that provisions **Neon Postgres**, **Neon Auth**, and the **`uploads` Object Storage bucket** in one step.

1. Install and sign in to the Neon CLI:
   ```bash
   npm install -g neon@latest
   neon login
   ```
2. Link your Neon project (or create a new one in the [Neon Console](https://console.neon.tech) in a region that supports Object Storage, such as `aws-ap-southeast-1`, `aws-us-east-1`, `aws-us-east-2`, or `aws-eu-central-1`):
   ```bash
   neon link --project-id <your-neon-project-id> --branch production
   ```
3. Deploy the services declared in [`neon.ts`](./neon.ts) and automatically pull the environment variables into `.env`:
   ```bash
   neon deploy
   ```

### 3. Configure `.env`

Copy any missing optional variables from [`.env.example`](./.env.example) into `.env` and make sure `NEON_AUTH_COOKIE_SECRET` is set to a random 32+ character string:

```bash
# Generate a 32-byte hex secret:
node -e "console.log('NEON_AUTH_COOKIE_SECRET=' + require('crypto').randomBytes(32).toString('hex'))"
```

See [`.env.example`](./.env.example) for the complete list of supported variables:
- `DATABASE_URL` — Neon Postgres connection string (auto-injected by `neon deploy`).
- `NEON_AUTH_BASE_URL` & `NEON_AUTH_COOKIE_SECRET` — Neon Auth endpoint and cookie signing secret (32+ chars).
- `AWS_ENDPOINT_URL_S3`, `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_REGION` — Neon Object Storage S3 credentials (auto-injected by `neon deploy`).
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASSWORD` *(optional)* — SMTP settings for receiving email alerts when someone submits the `/contact` form.
- `NEXT_PUBLIC_UMAMI_WEBSITE_ID` *(optional)* — Umami analytics website ID.

### 4. Initialize the Database Schema

Run the database initializer script to create all required tables (`profiles`, `projects`, `blogs`, `experiences`, `skills`, `messages`, `files`) and seed a starter profile row:

```bash
pnpm run db:init
```

### 5. Create Your Admin Account in Neon Auth

1. Open your project in the **Neon Console** → **Auth** tab.
2. Create your user account (or sign in via `/auth` using Google OAuth / Email & Password).
3. In the Neon Console Auth tab (or in the `neon_auth.user` table), ensure only your account is created or has `role = 'admin'`.

### 6. Run the Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000):
- Go to [http://localhost:3000/auth](http://localhost:3000/auth) to sign in.
- Once signed in, your avatar menu appears in the top navbar (`/account`), where you can update your name, headline, bio, avatar, logo, and view incoming contact messages.
- Add or edit **Projects** (`/projects/create`), **Blogs** (`/blogs/create`), **Experiences** (`/account/experiences`), and **Skills** (`/account/skills`) directly from the UI.

---

## 📁 Project Structure

```text
├── app/
│   ├── (main)/              # Public & admin pages (Home, Projects, Blogs, About, Contact, Account)
│   ├── api/
│   │   ├── auth/[...path]/  # Neon Auth (Managed Better Auth) proxy route handler
│   │   ├── contact/         # Nodemailer SMTP notification endpoint
│   │   └── storage/[fileId]/# File/image delivery endpoint (Neon Object Storage + Postgres fallback)
│   └── auth/                # Login page (Email/Password & Google OAuth)
├── components/              # UI components, Lexical editor blocks, and page sections
├── hooks/                   # TanStack Query hooks (useProject, useBlog, useExperience, useSkill, useUser, useStorage)
├── lib/
│   ├── auth/                # Neon Auth server (`server.ts`) & browser (`client.ts`) instances
│   ├── services/            # Client service wrappers & Zod validation schemas
│   └── neon.actions.ts      # Next.js Server Actions for Neon Postgres & Neon Object Storage
├── scripts/
│   └── init-db.mjs          # One-command database schema initializer (`pnpm run db:init`)
├── neon.ts                  # Declarative Neon infrastructure config (Auth + Object Storage buckets)
└── proxy.ts                 # Next.js 16 Neon Auth middleware (OAuth session exchange & route protection)
```

---

## 🌐 Deploying to Production (Vercel)

1. Push your repository to GitHub and import it into **Vercel**.
2. Add the environment variables from your `.env` (or connect the official **Neon Vercel Integration**).
3. Register your production domain in Neon Auth's trusted domains list so OAuth redirects are allowed:
   ```bash
   neon neon-auth domain add https://your-domain.com
   ```
4. Deploy!
