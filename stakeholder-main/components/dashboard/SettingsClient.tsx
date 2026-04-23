"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Shield, Key, Loader2, CheckCircle2, AlertCircle } from "lucide-react"
import { toast } from "sonner"

interface SettingsClientProps {
    initialHasKey: boolean
}

export default function SettingsClient({ initialHasKey }: SettingsClientProps) {
    const [apiKey, setApiKey] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [hasKey, setHasKey] = useState(initialHasKey)

    const handleSave = async () => {
        if (!apiKey.trim()) {
            toast.error("Please enter an API Key")
            return
        }

        setIsLoading(true)
        try {
            const res = await fetch("/api/user/settings", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ apiKey: apiKey.trim() })
            })

            const data = await res.json()

            if (data.success) {
                toast.success("Settings updated successfully")
                setHasKey(data.hasKey)
                setApiKey("") // Clear input after save
            } else {
                toast.error(data.error || "Failed to update settings")
            }
        } catch (error) {
            toast.error("Something went wrong")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="container max-w-2xl py-10 space-y-8">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight">Account Settings</h1>
                <p className="text-muted-foreground text-lg">
                    Manage your personal configurations and AI service keys.
                </p>
            </div>

            <Card className="border-2 border-primary/10 shadow-lg">
                <CardHeader className="bg-primary/5 border-b border-primary/5 pb-6">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg text-primary">
                            <Shield className="h-6 w-6" />
                        </div>
                        <div>
                            <CardTitle>AI Configuration</CardTitle>
                            <CardDescription>Configure your personal Google Gemini API Key</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="pt-8 space-y-6">
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="apiKey" className="text-base font-semibold">Gemini API Key</Label>
                            {hasKey ? (
                                <div className="flex items-center gap-2 px-2.5 py-1 bg-emerald-500/10 text-emerald-600 rounded-full text-xs font-black uppercase tracking-wider">
                                    <CheckCircle2 className="h-3.5 w-3.5" />
                                    Active
                                </div>
                            ) : (
                                <div className="flex items-center gap-2 px-2.5 py-1 bg-amber-500/10 text-amber-600 rounded-full text-xs font-black uppercase tracking-wider">
                                    <AlertCircle className="h-3.5 w-3.5" />
                                    Not Configured
                                </div>
                            )}
                        </div>

                        <div className="relative group">
                            <Key className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                            <Input
                                id="apiKey"
                                type="password"
                                placeholder={hasKey ? "•••••••••••••••••••••" : "Enter your AIzaSy... key"}
                                className="pl-10 h-12 bg-secondary/20 border-primary/10 focus:ring-1 focus:ring-primary outline-none transition-all"
                                value={apiKey}
                                onChange={(e) => setApiKey(e.target.value)}
                            />
                        </div>

                        <div className="p-4 rounded-xl bg-secondary/30 border border-primary/5 space-y-3">
                            <p className="text-sm font-medium text-muted-foreground leading-relaxed">
                                <span className="text-primary font-bold">Privacy Note:</span> Your API Key is stored securely in our database and is used only for personal AI analysis within your account. It will never be shared or used for other purposes.
                            </p>
                            <div className="text-xs text-muted-foreground flex items-center gap-2">
                                <Key className="h-3 w-3" />
                                <span>Get your key from <a href="https://aistudio.google.com/app/apikey" target="_blank" className="underline font-bold text-primary hover:text-primary/80 transition-colors">Google AI Studio</a></span>
                            </div>
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="bg-primary/5 pt-6 border-t border-primary/5 flex justify-end">
                    <Button 
                        onClick={handleSave} 
                        disabled={isLoading || !apiKey.trim()}
                        className="h-11 px-8 font-bold shadow-md shadow-primary/20 transition-all active:scale-95"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Saving...
                            </>
                        ) : (
                            "Save API Key"
                        )}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}
