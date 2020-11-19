import { Maybe } from 'purify-ts'
import { Score, ScoreNames } from '..'
import { Entity } from './entity'

export type BaseIdea = Entity & {
  id: string
  text: string
  userId: string
}

export type PartialIdea = BaseIdea & {
  scores?: Score[]
  getScore?: (type: ScoreNames) => Maybe<Score>
}

export type Idea = BaseIdea & {
  scores: Score[]
  getScore: (type: ScoreNames) => Maybe<Score>
}
