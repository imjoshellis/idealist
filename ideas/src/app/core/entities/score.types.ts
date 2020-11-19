import { Entity } from './entity'

export type BaseScore = Entity & {
  type: ScoreNames
  userIds: string[]
}

export type Score = BaseScore & {
  value: number
}

export enum ScoreNames {
  stars = 'stars',
  likes = 'likes',
  rejects = 'rejects'
}
