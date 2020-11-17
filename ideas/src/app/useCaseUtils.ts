import { ScoreNames } from './core/types'
import { InsertedScore } from './useCaseTypes'

export const makeScoreProps = (type: ScoreNames, score: InsertedScore) => (
  userIds: string[]
) => ({
  ...score,
  [key]: { userIds }
})
