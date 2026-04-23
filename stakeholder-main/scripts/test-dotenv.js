const dotenv = require('dotenv')
const path = require('path')
const fs = require('fs')

const envPath = path.resolve(process.cwd(), '.env')
console.log("Checking .env at:", envPath)

if (fs.existsSync(envPath)) {
    const raw = fs.readFileSync(envPath, 'utf8')
    console.log("Raw length:", raw.length)
    console.log("First 50 chars:", raw.substring(0, 50))
    
    const result = dotenv.config()
    if (result.error) {
        console.error("Dotenv Error:", result.error)
    } else {
        console.log("Dotenv Success!")
        console.log("DATABASE_URL present:", !!process.env.DATABASE_URL)
        if (process.env.DATABASE_URL) {
            console.log("DATABASE_URL ends with:", process.env.DATABASE_URL.slice(-10))
        }
    }
} else {
    console.error(".env NOT FOUND")
}
