-- ════════════════════════════════════════════════════════
-- TOOL SAVING FIX: DROP UNIQUE CONSTRAINT
-- ════════════════════════════════════════════════════════
-- This script allows multiple submissions per tool in the Sprint Pipeline.

-- 1. Drop the unique constraint that prevents multiple saves for same tool in same sprint
-- Prisma by default names this "SprintToolSubmission_sprintId_toolId_key"
DO $$ 
BEGIN
    IF EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'SprintToolSubmission_sprintId_toolId_key') THEN
        ALTER TABLE "SprintToolSubmission" DROP CONSTRAINT "SprintToolSubmission_sprintId_toolId_key";
    END IF;
END $$;

-- 2. Drop the index if it was created as a unique index instead of a constraint
DROP INDEX IF EXISTS "SprintToolSubmission_sprintId_toolId_key";

-- 3. Create non-unique indexes for performance
CREATE INDEX IF NOT EXISTS "SprintToolSubmission_sprintId_toolId_idx" ON "SprintToolSubmission"("sprintId", "toolId");
CREATE INDEX IF NOT EXISTS "SprintToolSubmission_sprintId_status_idx" ON "SprintToolSubmission"("sprintId", "status");

-- 4. Ensure Nudge Agent columns exist (in case previous 'db push' failed)
ALTER TABLE "SprintToolSubmission" ADD COLUMN IF NOT EXISTS "prerequisitesMet" BOOLEAN DEFAULT false;
ALTER TABLE "SprintToolSubmission" ADD COLUMN IF NOT EXISTS "blockedByToolId" TEXT;
ALTER TABLE "SprintToolSubmission" ADD COLUMN IF NOT EXISTS "blockedByToolName" TEXT;
ALTER TABLE "SprintToolSubmission" ADD COLUMN IF NOT EXISTS "fillHintsAvailable" BOOLEAN DEFAULT false;
ALTER TABLE "SprintToolSubmission" ADD COLUMN IF NOT EXISTS "resources" JSONB;

-- 5. Verification
SELECT COUNT(*) FROM "SprintToolSubmission";
