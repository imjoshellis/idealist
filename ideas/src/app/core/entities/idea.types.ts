import { Either, Maybe, NonEmptyList } from 'purify-ts'
import { Score, ScoreNames } from '..'
import { Entity } from './entity'

export type BaseIdea = Entity & {
  id: string
  text: string
  userId: string
  scores: NonEmptyList<Score>
}

export type FullIdea = BaseIdea & {
  getScore: (type: ScoreNames) => Maybe<Score>
}

export type Idea = Either<Error, FullIdea>
