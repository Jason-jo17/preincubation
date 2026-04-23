import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import CeoOverview from "./pages/CeoOverview";
import WorkspaceLandingPage from "./pages/WorkspaceLandingPage";
import MsmeEngagement from "./pages/MsmeEngagement";
import FundGovernance from "./pages/FundGovernance";
import AlertsCenter from "./pages/AlertsCenter";
import ReportsCenter from "./pages/ReportsCenter";
import GlobalSearch from "./pages/GlobalSearch";
import AdminControls from "./pages/AdminControls";
import NotFound from "./pages/NotFound";
import ComingSoon from "./pages/ComingSoon";

import FunnelOverviewPage from "./pages/ceo/msme-intel-port/FunnelOverviewPage";
import RegionalIntelligencePage from "./pages/ceo/msme-intel-port/RegionalIntelligencePage";
import SectorThesisPage from "./pages/ceo/msme-intel-port/SectorThesisPage";
import MsmeCompaniesDirectoryPage from "./pages/ceo/msme-intel-port/MsmeCompaniesDirectoryPage";
import MsmeCompanyDetailPage from "./pages/ceo/msme-intel-port/MsmeCompanyDetailPage";
import ComplianceDashboardPage from "./pages/ceo/msme-intel-port/ComplianceDashboardPage";
import SectorThesisDetailPage from "./pages/ceo/msme-intel-port/SectorThesisDetailPage";

import { InnovatorRoleLayout } from "./pages/innovator/InnovatorRoleLayout";
import InnovatorDashboard from "./pages/innovator/InnovatorDashboard";
import InnovatorProblemsBrowsePage from "./pages/innovator/InnovatorProblemsBrowsePage";
import InnovatorProblemDetailPage from "./pages/innovator/InnovatorProblemDetailPage";
import InnovatorSprintPage from "./pages/innovator/InnovatorSprintPage";
import InnovatorMarketplacePage from "./pages/innovator/InnovatorMarketplacePage";
import InnovatorProfilePage from "@/pages/innovator/InnovatorProfilePage";

import { CohortRoleLayout } from "./pages/cohort/CohortRoleLayout";
import CohortManagerDashboard from "./pages/cohort/CohortManagerDashboard";
import CohortProgramBuilderPage from "./pages/cohort/CohortProgramBuilderPage";

import { MsmeRoleLayout } from "./pages/msme/MsmeRoleLayout";
import MsmeDashboard from "./pages/msme/MsmeDashboard";
import MsmeChallengesPage from "./pages/msme/MsmeChallengesPage";
import MsmeApplicantsPage from "./pages/msme/MsmeApplicantsPage";
import MsmeMatchmakingPage from "./pages/msme/MsmeMatchmakingPage";
import MsmeBusinessHubPage from "./pages/msme/MsmeBusinessHubPage";
import MsmeEvaluationWorkspace from "./pages/msme/MsmeEvaluationWorkspace";
import MsmeTalentHubPage from "./pages/msme/MsmeTalentHubPage";

import { MentorRoleLayout } from "./pages/mentor/MentorRoleLayout";
import MentorDashboard from "./pages/mentor/MentorDashboard";
import MentorTeamsPage from "./pages/mentor/MentorTeamsPage";
import MentorSessionsPage from "./pages/mentor/MentorSessionsPage";
import MentorWorkspacePage from "./pages/mentor/MentorWorkspacePage";

import CeoRegionalHubPage from "./pages/ceo/CeoRegionalHubPage";
import CeoRegionDetailPage from "./pages/ceo/CeoRegionDetailPage";
import CeoSectorDetailPage from "./pages/ceo/CeoSectorDetailPage";
import CeoStartupDetailPage from "./pages/ceo/CeoStartupDetailPage";
import CeoIncubatorDetailPage from "./pages/ceo/CeoIncubatorDetailPage";
import CeoCohortDetailPage from "./pages/ceo/CeoCohortDetailPage";

import RegionalTalentPoolPage from "./pages/ceo/RegionalTalentPoolPage";
import RegionalTeamsFormedPage from "./pages/ceo/RegionalTeamsFormedPage";
import RegionalProjectsPage from "./pages/ceo/RegionalProjectsPage";
import RegionalPrototypesPage from "./pages/ceo/RegionalPrototypesPage";
import RegionalPilotsPage from "./pages/ceo/RegionalPilotsPage";
import RegionalStartupsPage from "./pages/ceo/RegionalStartupsPage";
import RegionalJobsPage from "./pages/ceo/RegionalJobsPage";
import RegionalMsmesPage from "./pages/ceo/RegionalMsmesPage";
import RegionalRoiPage from "./pages/ceo/RegionalRoiPage";

import AutomationPage from "./pages/ceo/AutomationPage";
import CEEDPage from "./pages/ceo/CEEDPage";
import ExpertHubPage from "./pages/ceo/ExpertHubPage";
import RoadmapReviewDetailPage from "./pages/ceo/RoadmapReviewDetailPage";
import EcosystemPage from "./pages/ceo/EcosystemPage";
import EcosystemDirectoryPage from "./pages/ceo/EcosystemDirectoryPage";
import EcosystemProviderProfilePage from "./pages/ceo/EcosystemProviderProfilePage";
import ProgramsPage from "./pages/ceo/ProgramsPage";
import StudentPortalPage from "./pages/ceo/StudentPortalPage";
import NavitasDueDiligencePage from "./pages/ceo/msme-intel-port/NavitasDueDiligencePage";

const queryClient = new QueryClient();

const RoleAwareRedirect = ({ ceoPath, msmePath }: { ceoPath: string; msmePath: string }) => {
  const { pathname } = useLocation();
  const isMsme = pathname.startsWith('/msme');
  return <Navigate to={isMsme ? msmePath : ceoPath} replace />;
};

const App = () => {
  console.log("[App] Rendering Maharashtra Innovation Platform...");

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<WorkspaceLandingPage />} />
            <Route path="/ceo/dashboard" element={<CeoOverview />} />
            
            {/* Helper for role-aware redirects of legacy paths */}
            <Route path="/sectors" element={<RoleAwareRedirect ceoPath="/ceo/regional-hub" msmePath="/msme/thesis" />} />
            <Route path="/incubation" element={<RoleAwareRedirect ceoPath="/ceo/regional-hub" msmePath="/msme/discovery" />} />
            <Route path="/startups" element={<RoleAwareRedirect ceoPath="/ceo/regional-hub" msmePath="/msme/companies" />} />
            <Route path="/performers" element={<RoleAwareRedirect ceoPath="/ceo/regional-hub" msmePath="/msme/applicants" />} />
            
            {/* MSME Intelligence System */}
            <Route path="/ceo/funnel" element={<FunnelOverviewPage />} />
            <Route path="/ceo/companies" element={<MsmeCompaniesDirectoryPage />} />
            <Route path="/ceo/compliance" element={<ComplianceDashboardPage />} />
            <Route path="/ceo/discovery" element={<RegionalIntelligencePage />} />
            <Route path="/ceo/thesis" element={<SectorThesisPage />} />
            <Route path="/ceo/thesis/:id" element={<SectorThesisDetailPage />} />
            <Route path="/ceo/companies/:id" element={<MsmeCompanyDetailPage />} />
            <Route path="/ceo/regional-intel" element={<RegionalIntelligencePage />} />
            <Route path="/ceo/automation" element={<AutomationPage />} />
            <Route path="/ceo/ecosystem" element={<EcosystemPage />} />
            <Route path="/ceo/ecosystem/:categoryId" element={<EcosystemDirectoryPage />} />
            <Route path="/ceo/ecosystem/provider/:providerId" element={<EcosystemProviderProfilePage />} />
            <Route path="/ceo/programs" element={<ProgramsPage />} />
            <Route path="/ceo/student-portal" element={<StudentPortalPage />} />
            <Route path="/ceo/prd-builder" element={<CEEDPage />} />
            <Route path="/ceo/expert-hub" element={<ExpertHubPage />} />
            <Route path="/ceo/expert-hub/review/:reviewId" element={<RoadmapReviewDetailPage />} />
            <Route path="/ceo/intelligence/navitas-mismatch" element={<NavitasDueDiligencePage />} />

            <Route path="/ceo/regional-hub" element={<CeoRegionalHubPage />} />
            <Route path="/ceo/regional-intelligence/talent-pool" element={<RegionalTalentPoolPage />} />
            <Route path="/ceo/regional-intelligence/teams-formed" element={<RegionalTeamsFormedPage />} />
            <Route path="/ceo/regional-intelligence/projects" element={<RegionalProjectsPage />} />
            <Route path="/ceo/regional-intelligence/prototypes" element={<RegionalPrototypesPage />} />
            <Route path="/ceo/regional-intelligence/pilots" element={<RegionalPilotsPage />} />
            <Route path="/ceo/regional-intelligence/startups" element={<RegionalStartupsPage />} />
            <Route path="/ceo/regional-intelligence/jobs" element={<RegionalJobsPage />} />
            <Route path="/ceo/regional-intelligence/msmes" element={<RegionalMsmesPage />} />
            <Route path="/ceo/regional-intelligence/roi" element={<RegionalRoiPage />} />
            <Route path="/ceo/region/:slug" element={<CeoRegionDetailPage />} />
            <Route path="/ceo/sector/:slug" element={<CeoSectorDetailPage />} />
            <Route path="/ceo/startup/:slug" element={<CeoStartupDetailPage />} />
            <Route path="/ceo/incubator/:slug" element={<CeoIncubatorDetailPage />} />
            <Route path="/ceo/cohort/:slug" element={<CeoCohortDetailPage />} />
            <Route path="/regional" element={<Navigate to="/ceo/regional-hub" replace />} />
            <Route path="/cohorts" element={<Navigate to="/ceo/regional-hub" replace />} />
            <Route path="/pipeline" element={<Navigate to="/ceo/regional-hub" replace />} />
            <Route path="/msme" element={<MsmeEngagement />} />
            <Route element={<MsmeRoleLayout />}>
              <Route path="/msme/dashboard" element={<MsmeDashboard />} />
              <Route path="/msme/challenges" element={<MsmeChallengesPage />} />
              <Route path="/msme/applicants" element={<MsmeApplicantsPage />} />
              <Route path="/msme/progress" element={<Navigate to="/msme/applicants" replace />} />
              <Route path="/msme/matchmaking" element={<MsmeMatchmakingPage />} />
              <Route path="/msme/talent-hub" element={<MsmeTalentHubPage />} />
              <Route path="/msme/challenges/:challengeId/evaluate/:applicantId" element={<MsmeEvaluationWorkspace />} />
              <Route path="/msme/business-hub" element={<MsmeBusinessHubPage />} />
              <Route path="/msme/messages" element={<Navigate to="/msme/business-hub?tab=messages" replace />} />
              <Route path="/msme/resources" element={<Navigate to="/msme/business-hub?tab=resources" replace />} />
              <Route path="/msme/insights" element={<Navigate to="/msme/business-hub?tab=reports" replace />} />
              <Route path="/msme/completed" element={<Navigate to="/msme/business-hub?tab=completed" replace />} />
              <Route path="/msme/profile" element={<Navigate to="/msme/business-hub?tab=company" replace />} />
            </Route>
            
            {/* Shared pages that already provide their own DashboardLayout */}
            <Route path="/msme/discovery" element={<CeoRegionalHubPage />} />
            <Route path="/msme/thesis" element={<SectorThesisPage />} />
            <Route path="/msme/thesis/:id" element={<SectorThesisDetailPage />} />
            <Route path="/msme/ecosystem" element={<EcosystemPage />} />
            <Route path="/msme/companies" element={<MsmeCompaniesDirectoryPage />} />
            <Route path="/msme/companies/:id" element={<MsmeCompanyDetailPage />} />
            <Route path="/msme/intelligence/navitas-mismatch" element={<NavitasDueDiligencePage />} />
            <Route path="/funds" element={<FundGovernance />} />
            <Route path="/alerts" element={<AlertsCenter />} />
            <Route path="/reports" element={<ReportsCenter />} />
            <Route path="/search" element={<GlobalSearch />} />
            <Route path="/admin" element={<AdminControls />} />
            <Route element={<InnovatorRoleLayout />}>
              <Route path="/innovator/dashboard" element={<InnovatorDashboard />} />
              <Route path="/innovator/problems" element={<InnovatorProblemsBrowsePage />} />
              <Route path="/innovator/problems/:problemId" element={<InnovatorProblemDetailPage />} />
              <Route path="/innovator/sprint" element={<InnovatorSprintPage />} />
              <Route path="/innovator/marketplace" element={<InnovatorMarketplacePage />} />
              <Route path="/innovator/profile" element={<InnovatorProfilePage />} />
            </Route>
            <Route element={<MentorRoleLayout />}>
              <Route path="/mentor/dashboard" element={<MentorDashboard />} />
              <Route path="/mentor/teams" element={<MentorTeamsPage />} />
              <Route path="/mentor/teams/:teamId/workspace" element={<MentorWorkspacePage />} />
              <Route path="/mentor/sessions" element={<MentorSessionsPage />} />
            </Route>
            <Route element={<CohortRoleLayout />}>
              <Route path="/cohort/dashboard" element={<CohortManagerDashboard />} />
              <Route path="/cohort/program" element={<CohortProgramBuilderPage />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
