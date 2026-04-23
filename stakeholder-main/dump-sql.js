require('dotenv').config({ path: '.env' })
const { execSync } = require('child_process')
const fs = require('fs')

try {
  console.log("Generating database migration diff...")
  // We use shadow database diff logic by comparing scheme to live url.
  // Actually, we can use prisma migrate dev --create-only as a dry run.
  // If the hanging issue is interactive, we will provide an explicit name.
  // Or we use migrate diff --from-schema-datasource ... Wait, the from-url syntax needs the exact connection string
  
  if (!process.env.DATABASE_URL) {
    console.error("DATABASE_URL is not set in .env")
    process.exit(1)
  }

  // Create migration SQL
  execSync(`npx prisma migrate diff --from-url "${process.env.DATABASE_URL}" --to-schema-datamodel prisma/schema.prisma --script > next_migration.sql`, { stdio: 'inherit' })
  console.log("Successfully generated next_migration.sql")
} catch (error) {
  console.error("Error generating migration script", error)
}
