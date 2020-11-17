import { ScoreKeys } from './core/types'

export type InsertedScore = {
  [key in ScoreKeys]: {
    userIds: string[]
    value: number
  }
}

export interface InsertedIdea {
  id: string
  text: string
  userId: string
  score: InsertedScore
}
