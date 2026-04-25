import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { FRAMEWORKS } from '@/data/venture-readiness-data'

export type FrameworkId = 'TRL' | 'BRL' | 'CRL' | 'MRL' | 'IRL' | 'SRL' | 'TmRL' | 'RRL'

export interface AssessmentScores {
  [frameworkId: string]: {
    [levelIndex: number]: {
      [questionIndex: number]: number // 0-4
    }
  }
}

export interface AssessmentLevels {
  [frameworkId: string]: number // 0-9
}

interface AssessmentStore {
  scores: AssessmentScores
  activeFrameworkId: FrameworkId
  activeLevelIndex: number
  
  // Actions
  setScore: (frameworkId: string, levelIndex: number, questionIndex: number, score: number) => void
  setActiveFramework: (id: FrameworkId) => void
  setActiveLevel: (index: number) => void
  resetScores: () => void
  hydrateScores: (scores: AssessmentScores) => void
  
  // Derived state helpers (usually called in components or via getters)
  getIsLevelAchieved: (frameworkId: string, levelIndex: number) => boolean
  getFrameworkLevel: (frameworkId: string) => number
  getOverallStage: () => string
}

export const useAssessmentStore = create<AssessmentStore>()(
  persist(
    (set, get) => ({
      scores: {},
      activeFrameworkId: 'TRL',
      activeLevelIndex: 0,

      setScore: (frameworkId, levelIndex, questionIndex, score) => {
        set((state) => {
          const newScores = { ...state.scores }
          if (!newScores[frameworkId]) newScores[frameworkId] = {}
          if (!newScores[frameworkId][levelIndex]) newScores[frameworkId][levelIndex] = {}
          newScores[frameworkId][levelIndex][questionIndex] = score
          return { scores: newScores }
        })
      },

      setActiveFramework: (id) => set({ activeFrameworkId: id, activeLevelIndex: 0 }),
      setActiveLevel: (index) => set({ activeLevelIndex: index }),
      
      resetScores: () => set({ scores: {} }),
      
      hydrateScores: (scores) => set({ scores }),

      getIsLevelAchieved: (frameworkId, levelIndex) => {
        const state = get()
        const levelScores = state.scores[frameworkId]?.[levelIndex]
        if (!levelScores) return false
        
        const values = Object.values(levelScores)
        if (values.length < 3) return false
        
        const avg = values.reduce((a, b) => a + b, 0) / 3
        const min = Math.min(...values)
        
        return avg >= 3.0 && min >= 2
      },

      getFrameworkLevel: (frameworkId) => {
        const state = get()
        let maxLevel = 0
        
        // Sequential check
        for (let i = 0; i < 9; i++) {
          if (state.getIsLevelAchieved(frameworkId, i)) {
            maxLevel = i + 1
          } else {
            break // Must be sequential
          }
        }
        
        return maxLevel
      },

      getOverallStage: () => {
        const state = get()
        const trl = state.getFrameworkLevel('TRL')
        if (trl >= 9) return 'Scale'
        if (trl >= 8) return 'Growth'
        if (trl >= 7) return 'Early Revenue'
        if (trl >= 5) return 'MVP'
        if (trl >= 3) return 'POC'
        return 'Idea'
      }
    }),
    {
      name: 'venture-readiness-storage',
    }
  )
)
