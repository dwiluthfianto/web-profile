"use server";

import { auth } from "@/lib/auth/server";
import { neon } from "@neondatabase/serverless";
import { Files } from "files-sdk";
import { neon as neonStorage } from "files-sdk/neon";
import crypto from "node:crypto";
import { cookies } from "next/headers";

// ponytail: direct SQL tagged template via @neondatabase/serverless, no ORM overhead
function getDb() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error("DATABASE_URL is not configured in .env");
  }
  return neon(url);
}

// ponytail: Managed Better Auth via @neon/auth with direct neon_auth.session DB fallback
export async function getSessionUser() {
  try {
    const { data: session } = await auth.getSession();
    if (session?.user) {
      return { ...session.user, $id: session.user.id };
    }
  } catch {
    // Fallback to direct DB lookup below
  }

  try {
    const cookieStore = await cookies();
    const allCookies = cookieStore.getAll();
    const tokenCookie = allCookies.find((c) =>
      c.name.endsWith("session_token")
    );
    if (!tokenCookie?.value) return null;

    const token = decodeURIComponent(tokenCookie.value).split(".")[0];
    const sql = getDb();
    const rows = await sql`
      SELECT u.id, u.email, u.name, u.role
      FROM neon_auth.session s
      JOIN neon_auth.user u ON u.id = s."userId"
      WHERE s.token = ${token} AND s."expiresAt" > NOW()
      LIMIT 1
    `;
    if (!rows[0]) return null;
    return { ...rows[0], $id: rows[0].id };
  } catch {
    return null;
  }
}

async function requireAdmin() {
  const user = await getSessionUser();
  if (!user) {
    throw new Error("Unauthorized: Neon Auth session required");
  }
  return user;
}

// --- Neon Object Storage via Files SDK ---
function hasS3Config(): boolean {
  return Boolean(
    process.env.AWS_ENDPOINT_URL_S3 &&
      process.env.AWS_ACCESS_KEY_ID &&
      process.env.AWS_SECRET_ACCESS_KEY
  );
}

function getStorageFiles() {
  const bucket = process.env.AWS_BUCKET_NAME || "uploads";
  return new Files({ adapter: neonStorage({ bucket }) });
}

export async function uploadFileAction(formData: FormData) {
  await requireAdmin();
  const file = formData.get("file") as File | null;
  if (!file) throw new Error("No file provided");

  const id = crypto.randomUUID().replace(/-/g, "").slice(0, 20);
  const buffer = Buffer.from(await file.arrayBuffer());
  const contentType = file.type || "application/octet-stream";

  if (hasS3Config()) {
    await getStorageFiles().upload(id, buffer, { contentType });
  }

  const sql = getDb();
  await sql`
    INSERT INTO files (id, name, content_type, data)
    VALUES (${id}, ${file.name}, ${contentType}, ${buffer})
  `;

  return { $id: id };
}

export async function getStoredFileAction(fileId: string): Promise<{
  buffer: Buffer;
  contentType: string;
} | null> {
  if (hasS3Config()) {
    try {
      const downloaded = await getStorageFiles().download(fileId);
      return {
        buffer: Buffer.from(await downloaded.arrayBuffer()),
        contentType: downloaded.type || "application/octet-stream",
      };
    } catch {
      // Fallback to Postgres files table if key is not in bucket
    }
  }

  const sql = getDb();
  const rows = await sql`
    SELECT content_type, data
    FROM files
    WHERE id = ${fileId}
    LIMIT 1
  `;
  if (!rows[0]) return null;

  const raw = rows[0].data;
  const buffer = Buffer.isBuffer(raw)
    ? raw
    : typeof raw === "string" && raw.startsWith("\\x")
      ? Buffer.from(raw.slice(2), "hex")
      : Buffer.from(raw);

  return {
    buffer,
    contentType: rows[0].content_type || "application/octet-stream",
  };
}

// --- Projects ---
export async function listProjectsAction(limit: number) {
  const sql = getDb();
  return await sql`
    SELECT id AS "$id", title, description, link, slug, image, created_at::text AS "$createdAt"
    FROM projects
    ORDER BY created_at DESC
    LIMIT ${limit}
  `;
}

export async function getProjectDetailAction(slug: string) {
  const sql = getDb();
  const rows = await sql`
    SELECT id AS "$id", title, description, link, slug, image, created_at::text AS "$createdAt"
    FROM projects
    WHERE slug = ${slug}
    LIMIT 1
  `;
  return rows[0] || null;
}

export async function createProjectAction(payload: {
  title: string;
  description: string;
  link: string;
  slug: string;
  image?: string;
}) {
  await requireAdmin();
  const sql = getDb();
  const id = crypto.randomUUID().replace(/-/g, "").slice(0, 20);
  await sql`
    INSERT INTO projects (id, title, description, link, slug, image)
    VALUES (${id}, ${payload.title}, ${payload.description}, ${payload.link}, ${payload.slug}, ${payload.image ?? ""})
  `;
}

export async function updateProjectAction(
  documentId: string,
  payload: {
    title: string;
    description: string;
    link: string;
    slug: string;
    image?: string;
  }
) {
  await requireAdmin();
  const sql = getDb();
  await sql`
    UPDATE projects
    SET title = ${payload.title},
        description = ${payload.description},
        link = ${payload.link},
        slug = ${payload.slug},
        image = COALESCE(${payload.image ?? null}, image)
    WHERE id = ${documentId}
  `;
}

export async function deleteProjectAction(documentId: string) {
  await requireAdmin();
  const sql = getDb();
  await sql`DELETE FROM projects WHERE id = ${documentId}`;
}

// --- Blogs ---
export async function listBlogsAction() {
  const sql = getDb();
  return await sql`
    SELECT id AS "$id", title, description, content, slug, COALESCE(views, 0) AS views, created_at::text AS "$createdAt"
    FROM blogs
    ORDER BY created_at DESC
  `;
}

export async function getBlogDetailAction(slug: string) {
  const sql = getDb();
  const rows = await sql`
    SELECT id AS "$id", title, description, content, slug, COALESCE(views, 0) AS views, created_at::text AS "$createdAt"
    FROM blogs
    WHERE slug = ${slug}
    LIMIT 1
  `;
  return rows[0] || null;
}

export async function incrementBlogViewsAction(slug: string) {
  const sql = getDb();
  const rows = await sql`
    UPDATE blogs
    SET views = COALESCE(views, 0) + 1
    WHERE slug = ${slug}
    RETURNING COALESCE(views, 0) AS views
  `;
  return rows[0]?.views ?? 0;
}

export async function createBlogAction(payload: {
  title: string;
  description: string;
  content: string;
  slug: string;
}) {
  await requireAdmin();
  const sql = getDb();
  const id = crypto.randomUUID().replace(/-/g, "").slice(0, 20);
  await sql`
    INSERT INTO blogs (id, title, description, content, slug)
    VALUES (${id}, ${payload.title}, ${payload.description}, ${payload.content}, ${payload.slug})
  `;
}

export async function updateBlogAction(
  documentId: string,
  payload: {
    title: string;
    description: string;
    content: string;
    slug: string;
  }
) {
  await requireAdmin();
  const sql = getDb();
  await sql`
    UPDATE blogs
    SET title = ${payload.title},
        description = ${payload.description},
        content = ${payload.content},
        slug = ${payload.slug}
    WHERE id = ${documentId}
  `;
}

export async function deleteBlogAction(documentId: string) {
  await requireAdmin();
  const sql = getDb();
  await sql`DELETE FROM blogs WHERE id = ${documentId}`;
}

// --- Experiences ---
export async function listExperiencesAction() {
  const sql = getDb();
  return await sql`
    SELECT id AS "$id",
           title,
           company,
           employment_type AS "employmentType",
           description,
           start_date::text AS "startDate",
           end_date::text AS "endDate",
           created_at::text AS "$createdAt"
    FROM experiences
    ORDER BY start_date DESC
  `;
}

export async function getExperienceDetailAction(documentId: string) {
  const sql = getDb();
  const rows = await sql`
    SELECT id AS "$id",
           title,
           company,
           employment_type AS "employmentType",
           description,
           start_date::text AS "startDate",
           end_date::text AS "endDate",
           created_at::text AS "$createdAt"
    FROM experiences
    WHERE id = ${documentId}
    LIMIT 1
  `;
  return rows[0] || null;
}

export async function createExperienceAction(payload: {
  title: string;
  company: string;
  employmentType: string;
  description: string;
  startDate: Date | string;
  endDate?: Date | string;
}) {
  await requireAdmin();
  const sql = getDb();
  const id = crypto.randomUUID().replace(/-/g, "").slice(0, 20);
  const startIso = new Date(payload.startDate).toISOString();
  const endIso = payload.endDate ? new Date(payload.endDate).toISOString() : null;
  const rows = await sql`
    INSERT INTO experiences (id, title, company, employment_type, description, start_date, end_date)
    VALUES (${id}, ${payload.title}, ${payload.company}, ${payload.employmentType}, ${payload.description}, ${startIso}, ${endIso})
    RETURNING id AS "$id"
  `;
  return rows[0];
}

export async function updateExperienceAction(
  documentId: string,
  payload: {
    title: string;
    company: string;
    employmentType: string;
    description: string;
    startDate: Date | string;
    endDate?: Date | string;
  }
) {
  await requireAdmin();
  const sql = getDb();
  const startIso = new Date(payload.startDate).toISOString();
  const endIso = payload.endDate ? new Date(payload.endDate).toISOString() : null;
  const rows = await sql`
    UPDATE experiences
    SET title = ${payload.title},
        company = ${payload.company},
        employment_type = ${payload.employmentType},
        description = ${payload.description},
        start_date = ${startIso},
        end_date = ${endIso}
    WHERE id = ${documentId}
    RETURNING id AS "$id"
  `;
  return rows[0];
}

export async function deleteExperienceAction(documentId: string) {
  await requireAdmin();
  const sql = getDb();
  await sql`DELETE FROM experiences WHERE id = ${documentId}`;
}

// --- Skills ---
export async function listSkillsAction() {
  const sql = getDb();
  return await sql`
    SELECT id AS "$id", title, image, created_at::text AS "$createdAt"
    FROM skills
    ORDER BY created_at DESC
  `;
}

export async function getSkillDetailAction(documentId: string) {
  const sql = getDb();
  const rows = await sql`
    SELECT id AS "$id", title, image, created_at::text AS "$createdAt"
    FROM skills
    WHERE id = ${documentId}
    LIMIT 1
  `;
  return rows[0] || null;
}

export async function createSkillAction(payload: {
  title: string;
  image?: string;
}) {
  await requireAdmin();
  const sql = getDb();
  const id = crypto.randomUUID().replace(/-/g, "").slice(0, 20);
  const rows = await sql`
    INSERT INTO skills (id, title, image)
    VALUES (${id}, ${payload.title}, ${payload.image ?? ""})
    RETURNING id AS "$id"
  `;
  return rows[0];
}

export async function updateSkillAction(
  documentId: string,
  payload: {
    title: string;
    image?: string;
  }
) {
  await requireAdmin();
  const sql = getDb();
  const rows = await sql`
    UPDATE skills
    SET title = ${payload.title},
        image = COALESCE(${payload.image ?? null}, image)
    WHERE id = ${documentId}
    RETURNING id AS "$id"
  `;
  return rows[0];
}

export async function deleteSkillAction(documentId: string) {
  await requireAdmin();
  const sql = getDb();
  await sql`DELETE FROM skills WHERE id = ${documentId}`;
}

// --- Messages ---
export async function createMessageAction(payload: {
  name: string;
  businessEmail: string;
  phoneNumber: string;
  companyName?: string;
  subject: string;
  message: string;
}) {
  const sql = getDb();
  const id = crypto.randomUUID().replace(/-/g, "").slice(0, 20);
  const rows = await sql`
    INSERT INTO messages (id, name, business_email, phone_number, company_name, subject, message)
    VALUES (${id}, ${payload.name}, ${payload.businessEmail}, ${payload.phoneNumber}, ${payload.companyName ?? ""}, ${payload.subject}, ${payload.message})
    RETURNING id AS "$id"
  `;
  return rows[0];
}

export async function listMessagesAction() {
  await requireAdmin();
  const sql = getDb();
  return await sql`
    SELECT id AS "$id",
           name,
           business_email AS "businessEmail",
           phone_number AS "phoneNumber",
           company_name AS "companyName",
           subject,
           message,
           created_at::text AS "$createdAt"
    FROM messages
    ORDER BY created_at DESC
  `;
}

// --- Profile ---
export async function getUserProfileAction() {
  const sql = getDb();
  const rows = await sql`
    SELECT id AS "$id", name, subheadline, about, todo, image, logo, created_at::text AS "$createdAt"
    FROM profiles
    LIMIT 1
  `;
  return rows[0] || null;
}

export async function updateUserProfileAction(
  documentId: string,
  payload: {
    name: string;
    subheadline: string;
    about: string;
    todo: string;
    image: string;
    logo: string;
  }
) {
  await requireAdmin();
  const sql = getDb();
  await sql`
    UPDATE profiles
    SET name = ${payload.name},
        subheadline = ${payload.subheadline},
        about = ${payload.about},
        todo = ${payload.todo},
        image = ${payload.image},
        logo = ${payload.logo}
    WHERE id = ${documentId}
  `;
}
