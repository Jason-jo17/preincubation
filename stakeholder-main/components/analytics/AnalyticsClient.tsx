"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts"

interface AnalyticsClientProps {
  stakeholderCount: number
  recentInteractions: number
  problemSeverity: { severity: string; count: number }[]
  topSectors: { name: string; count: number }[]
  sprintCompletions: { week: string; count: number }[]
  passRate: {
    crl: { total: number; passed: number; rate: number }
    irl: { total: number; passed: number; rate: number }
  }
}

const COLORS = ['#6b6bfa', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6']

export function AnalyticsClient({
  stakeholderCount,
  recentInteractions,
  problemSeverity,
  topSectors,
  sprintCompletions,
  passRate
}: AnalyticsClientProps) {
  return (
    <div className="space-y-8">
      {/* KPI Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Total Stakeholders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stakeholderCount.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">Verified participants</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Recent Interactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-[#6b6bfa]">{recentInteractions.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">Past 30 days</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">CRL Pass Rate</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{passRate.crl.rate}%</div>
              <div className="text-xs text-muted-foreground">{passRate.crl.passed}/{passRate.crl.total}</div>
            </div>
            <Progress value={passRate.crl.rate} className="h-1" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">IRL Pass Rate</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{passRate.irl.rate}%</div>
              <div className="text-xs text-muted-foreground">{passRate.irl.passed}/{passRate.irl.total}</div>
            </div>
            <Progress value={passRate.irl.rate} className="h-1" />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Problems by Severity */}
        <Card className="col-span-1 border-none shadow-xl bg-white/50 backdrop-blur-sm dark:bg-slate-900/50">
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              Problems by Severity
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={problemSeverity}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} strokeOpacity={0.1} />
                <XAxis dataKey="severity" axisLine={false} tickLine={false} fontSize={12} />
                <YAxis axisLine={false} tickLine={false} fontSize={12} />
                <Tooltip 
                  cursor={{fill: 'rgba(107, 107, 250, 0.05)'}}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="count" fill="#6b6bfa" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Sprint Completion Trend */}
        <Card className="col-span-1 border-none shadow-xl bg-white/50 backdrop-blur-sm dark:bg-slate-900/50">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Sprint Completion Trend (Last 8 Weeks)
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sprintCompletions}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} strokeOpacity={0.1} />
                <XAxis dataKey="week" axisLine={false} tickLine={false} fontSize={12} />
                <YAxis axisLine={false} tickLine={false} fontSize={12} />
                <Tooltip 
                   contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="count" 
                  stroke="#10b981" 
                  strokeWidth={3}
                  dot={{ r: 4, fill: '#10b981', strokeWidth: 2, stroke: '#fff' }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Top Sectors Distribution */}
        <Card className="col-span-1 lg:col-span-2 border-none shadow-xl bg-white/50 backdrop-blur-sm dark:bg-slate-900/50">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Stakeholder Distribution by Sector</CardTitle>
          </CardHeader>
          <CardContent className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={topSectors}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={140}
                  paddingAngle={5}
                  dataKey="count"
                  label={({ name, percent }) => `${name} ${(percent ? percent * 100 : 0).toFixed(0)}%`}
                >
                  {topSectors.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Legend verticalAlign="bottom" height={36}/>
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
