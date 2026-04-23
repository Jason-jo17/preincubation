-- SQL Script to resolve Prisma P2022 Error (missing User.apiKey column)
-- Run this in your Supabase SQL Editor or psql terminal

ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "apiKey" TEXT;

-- Verify migration
SELECT "id", "email", "role", "apiKey" FROM "User" LIMIT 1;
