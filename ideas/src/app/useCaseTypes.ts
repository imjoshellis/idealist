import { ScoreNames } from './core/types'

export type InsertedScore = {
  type: ScoreNames
  userIds: string[]
  value: number
}

export interface InsertedIdea {
  id: string
  text: string
  userId: string
  scores: InsertedScore[]
}
