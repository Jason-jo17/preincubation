import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-24">
            <div className="text-center space-y-6">
                <h1 className="text-4xl font-bold">MSME Intelligence Platform</h1>
                <p className="text-xl text-muted-foreground max-w-2xl">
                    AI-powered gap analysis and roadmap generation for MSMEs across 6 verticals and 9 strategic dimensions
                </p>
                <div className="flex gap-4 justify-center">
                    <Link href="/dashboard">
                        <Button>Go to Dashboard</Button>
                    </Link>
                </div>
            </div>
        </main>
    )
}
