import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    APPWRITE_API_ENDPOINT: process.env.APPWRITE_API_ENDPOINT,
    APPWRITE_PROJECT_ID: process.env.APPWRITE_PROJECT_ID,
    APPWRITE_DATABASE_ID: process.env.APPWRITE_DATABASE_ID,
    APPWRITE_PROFILE_COLLECTION_ID: process.env.APPWRITE_PROFILE_COLLECTION_ID,
    APPWRITE_PROJECT_COLLECTION_ID: process.env.APPWRITE_PROJECT_COLLECTION_ID,
    APPWRITE_BLOG_COLLECTION_ID: process.env.APPWRITE_BLOG_COLLECTION_ID,
    APPWRITE_EXPERIENCE_COLLECTION_ID:
      process.env.APPWRITE_EXPERIENCE_COLLECTION_ID,
    APPWRITE_SKILL_COLLECTION_ID: process.env.APPWRITE_SKILL_COLLECTION_ID,
    APPWRITE_MESSAGE_COLLECTION_ID: process.env.APPWRITE_MESSAGE_COLLECTION_ID,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "nyc.cloud.appwrite.io",
        port: "",
        pathname: "/v1/storage/buckets/**",
      },
    ],
  },
};

export default nextConfig;
