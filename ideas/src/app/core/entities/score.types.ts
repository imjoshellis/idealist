import { Either } from 'purify-ts'
import { Entity } from './entity'

export type BaseScore = Entity & {
  type: ScoreNames
  userIds: string[]
}

export type FullScore = BaseScore & {
  value: number
}

export type Score = Either<Error, FullScore>

export enum ScoreNames {
  stars = 'stars',
  likes = 'likes',
  rejects = 'rejects'
}
