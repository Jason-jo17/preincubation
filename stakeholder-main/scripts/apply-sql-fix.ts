
import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();

async function fixSchema() {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  
  try {
    console.log('Applying SQL fix to add User.apiKey column...');
    await pool.query('ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "apiKey" TEXT;');
    console.log('Successfully added apiKey column to User table.');
    
    // Also verify StudentJourney columns if necessary
    // await pool.query('ALTER TABLE "StudentJourney" ADD COLUMN IF NOT EXISTS "..." ...;');
    
  } catch (error) {
    console.error('Error applying SQL fix:', error);
  } finally {
    await pool.end();
  }
}

fixSchema();
