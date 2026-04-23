import { format, isAfter, isBefore, addDays, startOfDay } from "date-fns"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

interface InterviewSidebarProps {
    selectedDate: Date | null
    events: any[]
    onScheduleClick: () => void
}

export function InterviewSidebar({ selectedDate, events, onScheduleClick }: InterviewSidebarProps) {
    const today = startOfDay(new Date())
    const nextWeek = addDays(today, 7)
    
    const upcomingEvents = (events || [])
        .filter(event => {
            const date = new Date(event.start)
            return isAfter(date, today) && isBefore(date, nextWeek)
        })
        .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime())

    const getBadgeColor = (type: string) => {
        switch (type) {
            case 'Interview': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
            case 'Meeting': return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
            case 'Workshop': return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
            default: return 'bg-indigo-500/10 text-indigo-500 border-indigo-500/20';
        }
    }

    return (
        <div className="space-y-4">
            <Card className="border-none shadow-lg bg-card/50 backdrop-blur">
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Calendar</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <Calendar
                        mode="single"
                        selected={selectedDate || new Date()}
                        className="rounded-md"
                    />
                </CardContent>
            </Card>

            <Card className="border-none shadow-lg bg-card/50 backdrop-blur">
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Next 7 Days</CardTitle>
                </CardHeader>
                <CardContent className="p-4 space-y-4">
                    <ScrollArea className="h-[300px] pr-4">
                        {upcomingEvents.length === 0 ? (
                            <div className="text-sm text-muted-foreground text-center py-8">
                                No upcoming interviews.
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {upcomingEvents.map((event) => (
                                    <div key={event.id} className="group relative flex flex-col gap-1 p-3 rounded-xl border border-primary/5 hover:border-primary/20 bg-primary/5 transition-all">
                                        <div className="flex items-center justify-between gap-2">
                                            <Badge variant="outline" className={cn("text-[10px] font-black uppercase px-2 py-0.5", getBadgeColor(event.type))}>
                                                {event.type}
                                            </Badge>
                                            <span className="text-[10px] font-medium text-muted-foreground">
                                                {format(new Date(event.start), 'MMM d')}
                                            </span>
                                        </div>
                                        <h4 className="text-sm font-bold truncate leading-tight mt-1 group-hover:text-primary transition-colors">
                                            {event.title}
                                        </h4>
                                        <p className="text-[11px] text-muted-foreground flex items-center gap-1">
                                            {format(new Date(event.start), 'h:mm a')}
                                            {event.location && ` â€¢ ${event.location}`}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </ScrollArea>
                    <Button className="w-full shadow-lg shadow-primary/20 mt-2" onClick={onScheduleClick}>
                        Schedule New
                    </Button>
                </CardContent>
            </Card>

            <Card className="border-none shadow-lg bg-card/50 backdrop-blur">
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Quick Filters</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2 p-4 pt-2">
                    {['All', 'Interviews', 'Meetings', 'Workshops', 'Follow-ups'].map(f => (
                        <Badge key={f} variant="outline" className="cursor-pointer hover:bg-primary hover:text-white transition-all text-[10px] font-bold uppercase tracking-tight">
                            {f}
                        </Badge>
                    ))}
                </CardContent>
            </Card>
        </div>
    )
}
