'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAssessmentStore, FrameworkId } from '@/lib/store/assessment'
import { FRAMEWORKS } from '@/data/venture-readiness-data'
import { cn } from '@/lib/utils'
import { CheckCircle2, Circle, AlertCircle } from 'lucide-react'

interface AssessmentRubricProps {
  frameworkId: FrameworkId
  levelIndex: number
}

export function AssessmentRubric({ frameworkId, levelIndex }: AssessmentRubricProps) {
  const { scores, setScore, getIsLevelAchieved } = useAssessmentStore()
  const framework = FRAMEWORKS[frameworkId]
  const level = framework.levels[levelIndex]
  const isAchieved = getIsLevelAchieved(frameworkId, levelIndex)

  if (!level) return null

  const renderScoreButtons = (qIndex: number) => {
    const currentScore = scores[frameworkId]?.[levelIndex]?.[qIndex] ?? 0

    return (
      <div className="flex gap-2 mt-4">
        {[0, 1, 2, 3, 4].map((score) => (
          <button
            key={score}
            onClick={() => setScore(frameworkId, levelIndex, qIndex, score)}
            className={cn(
              "w-10 h-10 rounded-full text-sm font-bold transition-all border-2",
              currentScore === score
                ? "bg-accent text-bg-base border-accent scale-110 shadow-lg"
                : "bg-bg-surface border-border text-text-muted hover:border-accent/50"
            )}
          >
            {score}
          </button>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-2xl font-black tracking-tight text-text">
            Level {levelIndex + 1}: {level.t}
          </h3>
          <p className="text-text-muted mt-2 max-w-2xl">
            {level.d}
          </p>
        </div>
        
        <motion.div
          animate={{ scale: isAchieved ? 1.05 : 1 }}
          className={cn(
            "px-4 py-2 rounded-xl flex items-center gap-2 border-2 transition-colors",
            isAchieved 
              ? "bg-green-500/10 border-green-500 text-green-500" 
              : "bg-bg-surface border-border text-text-muted"
          )}
        >
          {isAchieved ? (
            <>
              <CheckCircle2 size={20} />
              <span className="font-bold uppercase text-xs tracking-widest">Achieved</span>
            </>
          ) : (
            <>
              <Circle size={20} />
              <span className="font-bold uppercase text-xs tracking-widest">In Progress</span>
            </>
          )}
        </motion.div>
      </div>

      <div className="grid gap-6">
        {level.q.map(([question, hint], qIndex) => (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            key={qIndex}
            className="bg-bg-surface border border-border rounded-2xl p-6 hover:border-accent/30 transition-colors"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-wider text-accent mb-2">
                  <span className="opacity-50">Question 0{qIndex + 1}</span>
                </div>
                <p className="text-lg font-medium text-text leading-tight">
                  {question}
                </p>
                <div className="flex items-center gap-2 mt-3 text-sm text-text-muted italic bg-bg-base/50 p-2 rounded-lg border border-dashed border-border/50">
                  <AlertCircle size={14} />
                  <span>Evidence: {hint}</span>
                </div>
              </div>

              <div className="flex-shrink-0">
                {renderScoreButtons(qIndex)}
                <div className="flex justify-between mt-2 px-1 text-[10px] font-bold uppercase tracking-tighter text-text-muted opacity-50">
                  <span>No Evidence</span>
                  <span>Full Evidence</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {!isAchieved && (
        <div className="p-4 rounded-xl bg-orange-500/5 border border-orange-500/20 text-orange-500 text-sm flex items-center gap-3">
          <AlertCircle size={18} />
          <p>
            <strong>Scoring Rule:</strong> Level is achieved if average score ≥ 3.0 AND every question is ≥ 2.
          </p>
        </div>
      )}
    </div>
  )
}
