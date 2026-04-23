const fs = require('fs')
const path = require('path')

const schemaPath = path.resolve(__dirname, '../prisma/schema.prisma')
console.log("Repairing:", schemaPath)

try {
    const buffer = fs.readFileSync(schemaPath)
    console.log("Original buffer length:", buffer.length)
    
    // Remove null bytes and non-ASCII if needed, but mostly focus on fixing UTF-16 double zero issue
    let clean = ''
    // If it looks like UTF-16LE, convert it
    if (buffer[0] === 0xFF && buffer[1] === 0xFE) {
        console.log("UTF-16LE BOM detected")
        clean = buffer.toString('utf16le')
    } else if (buffer.indexOf(0x00) !== -1) {
        console.log("Null bytes detected, stripping...")
        // Basic filter: keep printable ASCII, \n, \r, \t
        for (let i = 0; i < buffer.length; i++) {
            const b = buffer[i]
            if (b === 0x00) continue 
            if ((b >= 32 && b <= 126) || b === 10 || b === 13 || b === 9) {
                clean += String.fromCharCode(b)
            }
        }
    } else {
        console.log("No obvious corruption detected in buffer prefix, re-saving as clean UTF-8")
        clean = buffer.toString('utf8')
    }

    fs.writeFileSync(schemaPath, clean, 'utf8')
    console.log("Repair complete. New length:", clean.length)
} catch (e) {
    console.error("Repair failed:", e)
}
