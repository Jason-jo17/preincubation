import { redirect } from "next/navigation"

export default async function ToolSlugPage({ params }: { params: { slug: string } }) {
  const { slug } = await params
  // Simply redirect to the dashboard with the tool parameter
  // This maintains the existing RoadmapView context while providing the requested "slug" URL
  redirect(`/student/dashboard?tool=${slug}`)
}
