import { Either } from 'purify-ts'
import { Idea, ScoreNames } from '../core'

export interface RateInput {
  idea: Either<Error, Idea>
  type: ScoreNames
  userId: string
}
