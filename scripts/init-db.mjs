import { neon } from "@neondatabase/serverless";

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  console.error("❌ Error: DATABASE_URL is not configured in .env");
  process.exit(1);
}

const sql = neon(DATABASE_URL);

async function main() {
  console.log("📦 Initializing tables in Neon Postgres...");

  await sql`
    CREATE TABLE IF NOT EXISTS profiles (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      subheadline TEXT NOT NULL,
      about TEXT NOT NULL,
      todo TEXT NOT NULL,
      image TEXT NOT NULL,
      logo TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS projects (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      link TEXT NOT NULL,
      slug TEXT NOT NULL,
      image TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS blogs (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      content TEXT NOT NULL,
      slug TEXT NOT NULL,
      views INTEGER NOT NULL DEFAULT 0,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS experiences (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      company TEXT NOT NULL,
      employment_type TEXT NOT NULL,
      description TEXT NOT NULL,
      start_date TIMESTAMPTZ NOT NULL,
      end_date TIMESTAMPTZ,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS skills (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      image TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS messages (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      business_email TEXT NOT NULL,
      phone_number TEXT NOT NULL,
      company_name TEXT,
      subject TEXT NOT NULL,
      message TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS files (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      content_type TEXT NOT NULL,
      data BYTEA NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;

  // Insert a default starter profile if none exists yet
  const existing = await sql`SELECT id FROM profiles LIMIT 1`;
  if (existing.length === 0) {
    await sql`
      INSERT INTO profiles (id, name, subheadline, about, todo, image, logo)
      VALUES (
        'default-profile',
        'Your Name',
        'Software Engineer & Product Builder',
        'Write a short bio about yourself here from the /account dashboard.',
        'Building cool things with Next.js & Neon',
        '',
        ''
      )
    `;
    console.log("✅ Created default starter profile row.");
  }

  console.log("🎉 Database schema initialized successfully!");
}

main().catch((err) => {
  console.error("❌ Database initialization failed:", err);
  process.exit(1);
});
