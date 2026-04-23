-- IDEMPOTENT SQL SCRIPT FOR INUNITY V7.1
-- This script adds missing tables and columns without failing if they already exist.

-- 1. TABLES
CREATE TABLE IF NOT EXISTS "Sprint" (
    "id" TEXT PRIMARY KEY,
    "journeyId" TEXT NOT NULL,
    "sprintNumber" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "stageNumber" INTEGER NOT NULL,
    "weekRange" TEXT NOT NULL,
    "trlGate" TEXT NOT NULL,
    "crlIrlOutput" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'locked',
    "gateChecks" JSONB NOT NULL DEFAULT '[]',
    "trl4Criteria" JSONB NOT NULL DEFAULT '[]',
    "startedAt" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),
    "blockedReason" TEXT,
    "mentorNote" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

CREATE TABLE IF NOT EXISTS "SprintToolSubmission" (
    "id" TEXT PRIMARY KEY,
    "sprintId" TEXT NOT NULL,
    "toolId" TEXT NOT NULL,
    "toolName" TEXT NOT NULL,
    "trlContribution" TEXT NOT NULL,
    "crlDimension" TEXT,
    "irlDimension" TEXT,
    "maxPercent" INTEGER,
    "submittedData" JSONB,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "gateCheck" TEXT NOT NULL,
    "isGateLevel" BOOLEAN NOT NULL DEFAULT true,
    "prerequisitesMet" BOOLEAN NOT NULL DEFAULT false,
    "blockedByToolId" TEXT,
    "blockedByToolName" TEXT,
    "fillHintsAvailable" BOOLEAN NOT NULL DEFAULT false,
    "resources" JSONB,
    "submittedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

CREATE TABLE IF NOT EXISTS "CRLEvidence" (
    "id" TEXT PRIMARY KEY,
    "journeyId" TEXT NOT NULL,
    "dimension" TEXT NOT NULL,
    "dimensionWeight" INTEGER NOT NULL,
    "evidenceText" TEXT NOT NULL,
    "evidenceUrls" JSONB NOT NULL DEFAULT '[]',
    "sprintToolsCited" JSONB NOT NULL DEFAULT '[]',
    "aiScore" INTEGER,
    "criterionScores" JSONB,
    "assessmentNotes" TEXT,
    "improvementGuidance" TEXT,
    "autoRejectReason" TEXT,
    "passed" BOOLEAN NOT NULL DEFAULT false,
    "weightedScore" INTEGER,
    "status" TEXT NOT NULL DEFAULT 'draft',
    "resubmissionCount" INTEGER NOT NULL DEFAULT 0,
    "mentorNotified" BOOLEAN NOT NULL DEFAULT false,
    "submittedAt" TIMESTAMP(3),
    "reviewedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

CREATE TABLE IF NOT EXISTS "IRLEvidence" (
    "id" TEXT PRIMARY KEY,
    "journeyId" TEXT NOT NULL,
    "dimension" TEXT NOT NULL,
    "dimensionWeight" INTEGER NOT NULL,
    "evidenceText" TEXT NOT NULL,
    "evidenceUrls" JSONB NOT NULL DEFAULT '[]',
    "sprintToolsCited" JSONB NOT NULL DEFAULT '[]',
    "aiScore" INTEGER,
    "criterionScores" JSONB,
    "assessmentNotes" TEXT,
    "improvementGuidance" TEXT,
    "autoRejectReason" TEXT,
    "passed" BOOLEAN NOT NULL DEFAULT false,
    "weightedScore" INTEGER,
    "status" TEXT NOT NULL DEFAULT 'draft',
    "resubmissionCount" INTEGER NOT NULL DEFAULT 0,
    "mentorNotified" BOOLEAN NOT NULL DEFAULT false,
    "submittedAt" TIMESTAMP(3),
    "reviewedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

CREATE TABLE IF NOT EXISTS "NudgeEvent" (
    "id" TEXT PRIMARY KEY,
    "journeyId" TEXT NOT NULL,
    "nudgeType" TEXT NOT NULL,
    "targetToolId" TEXT NOT NULL,
    "targetToolName" TEXT NOT NULL,
    "blockedByToolId" TEXT,
    "blockedByToolName" TEXT,
    "message" TEXT NOT NULL,
    "fillHints" JSONB,
    "dismissed" BOOLEAN NOT NULL DEFAULT false,
    "dismissedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "SprintTemplate" (
    "id" TEXT PRIMARY KEY,
    "name" TEXT NOT NULL,
    "sprintNumber" INTEGER NOT NULL,
    "weekRange" TEXT NOT NULL,
    "trlGate" TEXT,
    "crlIrlOutput" TEXT,
    "description" TEXT,
    "isPublic" BOOLEAN NOT NULL DEFAULT false,
    "creatorId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

CREATE TABLE IF NOT EXISTS "SprintTemplateTool" (
    "id" TEXT PRIMARY KEY,
    "templateId" TEXT NOT NULL,
    "toolId" TEXT NOT NULL,
    "toolName" TEXT NOT NULL,
    "isGateLevel" BOOLEAN NOT NULL DEFAULT false,
    "trlContribution" TEXT,
    "resources" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 2. FOREIGN KEYS (Ignore if already exist)
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'Sprint_journeyId_fkey') THEN
        ALTER TABLE "Sprint" ADD CONSTRAINT "Sprint_journeyId_fkey" FOREIGN KEY ("journeyId") REFERENCES "StudentJourney"("id") ON DELETE CASCADE ON UPDATE CASCADE;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'SprintToolSubmission_sprintId_fkey') THEN
        ALTER TABLE "SprintToolSubmission" ADD CONSTRAINT "SprintToolSubmission_sprintId_fkey" FOREIGN KEY ("sprintId") REFERENCES "Sprint"("id") ON DELETE CASCADE ON UPDATE CASCADE;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'CRLEvidence_journeyId_fkey') THEN
        ALTER TABLE "CRLEvidence" ADD CONSTRAINT "CRLEvidence_journeyId_fkey" FOREIGN KEY ("journeyId") REFERENCES "StudentJourney"("id") ON DELETE CASCADE ON UPDATE CASCADE;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'IRLEvidence_journeyId_fkey') THEN
        ALTER TABLE "IRLEvidence" ADD CONSTRAINT "IRLEvidence_journeyId_fkey" FOREIGN KEY ("journeyId") REFERENCES "StudentJourney"("id") ON DELETE CASCADE ON UPDATE CASCADE;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'NudgeEvent_journeyId_fkey') THEN
        ALTER TABLE "NudgeEvent" ADD CONSTRAINT "NudgeEvent_journeyId_fkey" FOREIGN KEY ("journeyId") REFERENCES "StudentJourney"("id") ON DELETE CASCADE ON UPDATE CASCADE;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'SprintTemplateTool_templateId_fkey') THEN
        ALTER TABLE "SprintTemplateTool" ADD CONSTRAINT "SprintTemplateTool_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "SprintTemplate"("id") ON DELETE CASCADE ON UPDATE CASCADE;
    END IF;
END $$;

-- 3. COLUMNS (Add if missing)
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='SprintToolSubmission' AND column_name='resources') THEN
        ALTER TABLE "SprintToolSubmission" ADD COLUMN "resources" JSONB;
    END IF;
END $$;

-- 4. INDICES
CREATE INDEX IF NOT EXISTS "Sprint_journeyId_status_idx" ON "Sprint"("journeyId", "status");
CREATE UNIQUE INDEX IF NOT EXISTS "Sprint_journeyId_sprintNumber_key" ON "Sprint"("journeyId", "sprintNumber");
CREATE INDEX IF NOT EXISTS "SprintToolSubmission_sprintId_status_idx" ON "SprintToolSubmission"("sprintId", "status");
CREATE UNIQUE INDEX IF NOT EXISTS "SprintToolSubmission_sprintId_toolId_key" ON "SprintToolSubmission"("sprintId", "toolId");
CREATE INDEX IF NOT EXISTS "CRLEvidence_journeyId_dimension_idx" ON "CRLEvidence"("journeyId", "dimension");
CREATE INDEX IF NOT EXISTS "CRLEvidence_journeyId_status_idx" ON "CRLEvidence"("journeyId", "status");
CREATE INDEX IF NOT EXISTS "IRLEvidence_journeyId_dimension_idx" ON "IRLEvidence"("journeyId", "dimension");
CREATE INDEX IF NOT EXISTS "NudgeEvent_journeyId_targetToolId_idx" ON "NudgeEvent"("journeyId", "targetToolId");
