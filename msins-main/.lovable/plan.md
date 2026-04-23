

## Maharashtra Innovation Command Center — Implementation Plan

A premium, dark-themed strategic control center with 4 main dashboard pages, a fixed left sidebar, and a top bar with notifications/filters.

### Global Shell
- **Left Sidebar** (fixed, collapsible): Navigation to all 4 dashboards — CEO Overview, Regional Intelligence, Innovation Pipeline, MSME Engagement. Icons + labels, active route highlighting.
- **Top Bar**: Platform title, district/division filter dropdowns, notification bell with alert count, CEO avatar.
- **Dark Theme**: Near-black background (#0a0b0f), card surfaces (#12131a), subtle borders, green/yellow/red status colors throughout.
- **Typography**: Large bold metrics, small muted labels, clear hierarchy.

### Page 1: CEO Overview (Command Center)
- **KPI Row** (5 cards): Total MSMEs (3.71M), Active Cohorts, Active Innovators, Problems Posted, Conversion Rate — each with large number, label, and trend arrow (green ↑ / red ↓).
- **Innovation Funnel + Sector Distribution**: Left side shows a horizontal funnel (Ideas → Applications → Prototypes → Pilots → Deployments) with counts and conversion rates. Right side shows a donut chart of sector distribution.
- **Cohort Performance**: Top 5 performing cohorts (green indicators) and bottom 5 (red indicators) in a clean table/card format.
- **MSME Engagement Summary**: Problems posted vs solved bar comparison, average resolution time metric.
- **Alerts Panel**: Cards flagging low-activity cohorts, problems with no applicants, delayed projects — color-coded by severity.
- **Insight Cards**: Strategic recommendations like "Vidarbha underperforming vs MSME base", "Manufacturing sector leading", "X problems inactive" — styled as highlighted recommendation cards.

### Page 2: Regional Intelligence
- **Top KPI Row**: Total MSMEs, Districts (36), Divisions (6), Employment (59.2L).
- **Map Section**: Stylized SVG heatmap of Maharashtra showing MSME density by region. Pune/Konkan in green (saturated), Vidarbha/Marathwada in yellow/red (underserved).
- **Division Cards** (right panel): 6 cards for each division showing MSME count, key districts, and status tags (High Innovation / Emerging / Underserved Opportunity ⚠️).
- **Opportunity Insights**: Bottom section with strategic text cards highlighting intervention potential.

### Page 3: Innovation Pipeline
- **Stage Metrics Row**: Ideas, Applications, Selected Teams, Prototypes, Pilots, Deployments — each with count.
- **Horizontal Funnel Visualization**: Visual flow showing each stage with conversion rates and drop-off percentages between stages.
- **Active Projects Table**: Project name, current stage, assigned cohort, progress bar.
- **Bottleneck Insights** (right panel): Cards highlighting pipeline leaks like "High drop-off at prototype stage".

### Page 4: MSME Engagement
- **Top Metrics**: MSMEs onboarded, Problems posted, Problems solved, Avg response time.
- **Charts**: Problem trends over time (line chart), Sector participation (bar chart).
- **MSME Table**: Sortable list with MSME name, problems posted, active projects, status badge.
- **Insight Cards**: "X MSMEs inactive", "Y problems pending >30 days".

### Tech Approach
- Recharts for all charts (donut, line, bar, funnel).
- All data is realistic mock data based on the Maharashtra context provided.
- Fully responsive grid layouts using Tailwind CSS.
- Consistent card component with dark glass-like styling throughout.

