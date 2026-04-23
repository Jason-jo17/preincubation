-- MOSI Schema Repair Migration
-- Run this BEFORE re-attempting the seed scripts

DO $$
BEGIN
    -- 1. Add user_id column to companies if missing
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'companies' AND column_name = 'user_id'
    ) THEN
        ALTER TABLE companies ADD COLUMN user_id UUID REFERENCES auth.users(id);
        RAISE NOTICE '✅ Added user_id column to companies table.';
    END IF;

    -- 2. Add UNIQUE constraint to companies(name) if missing
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE table_name = 'companies' AND constraint_name = 'companies_name_key'
    ) THEN
        -- Cleanup potential duplicates first (keep newest)
        DELETE FROM companies a USING companies b 
        WHERE a.id < b.id AND a.name = b.name;

        ALTER TABLE companies ADD CONSTRAINT companies_name_key UNIQUE (name);
        RAISE NOTICE '✅ Added UNIQUE constraint to companies(name).';
    END IF;

    -- 3. Add UNIQUE constraint to stakeholders(email) if missing
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE table_name = 'stakeholders' AND constraint_name = 'stakeholders_email_key'
    ) THEN
        -- Cleanup potential duplicates first (keep newest)
        DELETE FROM stakeholders a USING stakeholders b 
        WHERE a.id < b.id AND a.email = b.email;
        
        ALTER TABLE stakeholders ADD CONSTRAINT stakeholders_email_key UNIQUE (email);
        RAISE NOTICE '✅ Added UNIQUE constraint to stakeholders(email).';
    END IF;

    -- 4. Ensure Sectors are unique
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE table_name = 'sectors' AND constraint_name = 'sectors_name_key'
    ) THEN
        ALTER TABLE sectors ADD CONSTRAINT sectors_name_key UNIQUE (name);
        RAISE NOTICE '✅ Added UNIQUE constraint to sectors(name).';
    END IF;

    RAISE NOTICE '🚀 Schema Repair Complete! You can now run seed_repository.sql and seed_interviews.sql safely.';
END $$;
