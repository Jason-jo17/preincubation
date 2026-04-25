"use client"

import { MTPCanvas } from "./MTPCanvas"
import { MindMap5W1H } from "./MindMap5W1H"
import { EmpathyMap } from "./EmpathyMap"
import { SevenWhys } from "./SevenWhys"
import { FishboneDiagram } from "./FishboneDiagram"
import { EventPattern } from "./event-pattern/EventPattern"
import { StakeholderMapping } from "./stakeholder-mapping/StakeholderMapping"
import { InterviewGuide } from "./interview-guide/InterviewGuide"
import { AffinityMapping } from "./affinity-mapping/AffinityMapping"
import { VPCBuilder } from "./vpc/VPCBuilder"
import { ERRCCanvas } from "./errc/ERRCCanvas"
import { PersonaJourneyTool } from './persona-journey/PersonaJourneyTool'
import { Crazy8Tool } from './crazy8/Crazy8Tool'
import { InnovationTool } from './innovation/InnovationTool'
import { SixPathsTool } from './six-paths/SixPathsTool'
import { PrototypingHub } from './prototyping-hub'
import { UserTestingHub } from './user-testing'
import PitchDeckBuilder from './pitch-deck/PitchDeckBuilder'
import { ProblemStakeholderMatrixTool } from "./mapping/ProblemStakeholderMatrixTool"
import { PerceivedValueTool } from "./perceived-value/PerceivedValueTool"
import { ReadinessDiagnostic } from "./ReadinessDiagnostic"
import { DiagnosticScorecard } from "../diagnostic/DiagnosticScorecard"
import { PESTLETool } from "./pestle/PESTLETool"
import { SWOTTool } from "./swot/SWOTTool"
import { BMCTool } from "./bmc/BMCTool"
import { LeanCanvasTool } from "./lean-canvas/LeanCanvasTool"
import { PortersFiveForcesTool } from "./porters/PortersFiveForcesTool"
import { TheoryOfChangeTool } from "./theory-of-change/TheoryOfChangeTool"

import { GenericToolForm } from "./GenericToolForm"

interface ToolRunnerProps {
    tool: any
    progress: any
    onDataSaved?: () => void
    isNewIteration?: boolean
    submissionId?: string
}

export function ToolRunner({ tool, progress, onDataSaved, isNewIteration, submissionId }: ToolRunnerProps) {
    if (!tool) return null

    // Map toolId to component
    switch (tool.toolId) {
        case 'mtp_ikigai':
        case 'mtp_canvas':
            return <MTPCanvas tool={tool} progress={progress} onDataSaved={onDataSaved} />

        case 'mind_map_5w1h':
        case 'mind_mapping_5w1h':
            return <MindMap5W1H tool={tool} progress={progress} onDataSaved={onDataSaved} />

        case 'empathy_map':
        case 'empathy_mapping':
            return <EmpathyMap tool={tool} progress={progress} onDataSaved={onDataSaved} />

        case 'seven_whys':
            return <SevenWhys tool={tool} progress={progress} onDataSaved={onDataSaved} />

        case 'fishbone_diagram':
            return <FishboneDiagram tool={tool} progress={progress} onDataSaved={onDataSaved} />

        case 'event_pattern':
            return <EventPattern tool={tool} progress={progress} onDataSaved={onDataSaved} />

        case 'stakeholder_mapping':
        case 'stakeholder_value': // Unify both tools
            return <StakeholderMapping tool={tool} progress={progress} onDataSaved={onDataSaved} />

        case 'interview_guide':
        case 'interview_framework': // Handle DB mismatch
            return <InterviewGuide tool={tool} progress={progress} onDataSaved={onDataSaved} />

        case 'affinity_mapping':
            return <AffinityMapping tool={tool} progress={progress} onDataSaved={onDataSaved} />

        case 'vpc':
        case 'vpc_tool':
        case 'vpu':
        case 'value_proposition':
        case 'vpc_builder':
        case 'vpc_value_map':
            return <VPCBuilder tool={tool} progress={progress} onDataSaved={onDataSaved} />

        case 'errc_grid':
        case 'errc_analysis':
        case 'errc':
        case 'errc_canvas':
            return <ERRCCanvas tool={tool} progress={progress} onDataSaved={onDataSaved} />

        case 'user_persona':
        case 'persona_mapping':
        case 'journey_map':
        case 'user_persona_journey':
        case 'persona_journey':
            return <PersonaJourneyTool tool={tool} progress={progress} onDataSaved={onDataSaved} />

        case 'crazy8':
        case 'crazy_8s':
        case 'crazy_8':
        case 'rapid_ideation':
        case 'solution_design':
            return <Crazy8Tool tool={tool} progress={progress} onDataSaved={onDataSaved} />

        case 'innovation':
        case 'systematic_innovation':
        case 'triz':
        case 'scamper':
        case 'triz_scamper':
        case 'innovation_builder':
        case 'innovation_tool':
            return <InnovationTool tool={tool} progress={progress} onDataSaved={onDataSaved} />

        case 'six_paths':
        case 'blue_ocean':
        case 'market_boundaries':
            return <SixPathsTool tool={tool} progress={progress} onDataSaved={onDataSaved} />

        case 'prototyping_hub':
        case 'prototype_builder':
        case 'trl_tracker':
            return <PrototypingHub tool={tool} progress={progress} onDataSaved={onDataSaved} />
        case 'user_testing':
        case 'feedback_hub':
        case 'usability_testing':
        case 'feedback_recorder':
            return <UserTestingHub tool={tool} progress={progress} onDataSaved={onDataSaved} />
        case 'pitch_deck':
        case 'pitch_deck_builder':
        case 'pitchdeck_builder':
        case 'investor_deck':
            return <PitchDeckBuilder tool={tool} progress={progress} />
            
        case 'problem_stakeholder_matrix':
            return <ProblemStakeholderMatrixTool tool={tool} progress={progress} onDataSaved={onDataSaved} />

        case 'perceived_value':
            return <PerceivedValueTool tool={tool} progress={progress} onDataSaved={onDataSaved} />

        case 'readiness_diagnostic':
        case 'diagnostic':
        case 'venture_readiness':
            if (progress?.submittedData || progress?.data) {
                return <DiagnosticScorecard data={progress?.submittedData || progress?.data} />
            }
            return <ReadinessDiagnostic tool={tool} progress={progress} onDataSaved={onDataSaved} />

        case 'pestle':
        case 'pestle_analysis':
            return <PESTLETool tool={tool} progress={progress} onDataSaved={onDataSaved} submissionId={submissionId} />

        case 'swot':
        case 'swot_analysis':
        case 'swot_matrix':
            return <SWOTTool tool={tool} progress={progress} onDataSaved={onDataSaved} submissionId={submissionId} />

        case 'bmc':
        case 'business_model_canvas':
            return <BMCTool tool={tool} progress={progress} onDataSaved={onDataSaved} submissionId={submissionId} />

        case 'lean_canvas':
            return <LeanCanvasTool tool={tool} progress={progress} onDataSaved={onDataSaved} submissionId={submissionId} />

        case 'porters_five_forces':
        case 'porters':
            return <PortersFiveForcesTool tool={tool} progress={progress} onDataSaved={onDataSaved} submissionId={submissionId} />

        case 'theory_of_change':
        case 'toc':
            return <TheoryOfChangeTool tool={tool} progress={progress} onDataSaved={onDataSaved} submissionId={submissionId} />

        default:
            return <GenericToolForm tool={tool} progress={progress} onDataSaved={onDataSaved} />
    }
}
