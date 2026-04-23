Get-Content .env | ForEach-Object {
    if ($_ -match '^([^=]+)=(.*)$') {
        $key = $Matches[1].Trim()
        $value = $Matches[2].Trim()
        if (-not $key.StartsWith('#')) {
            # Trim optional quotes around the value
            if ($value -match '^["''](.*)["'']$') {
                $value = $Matches[1]
            }
            [Environment]::SetEnvironmentVariable($key, $value, "Process")
        }
    }
}
npx prisma migrate diff --from-url $env:DATABASE_URL --to-schema-datamodel prisma/schema.prisma --script > next_migration.sql
