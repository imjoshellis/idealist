import { Either, List, Maybe, Right } from 'purify-ts'
import { Entity } from './entity'

export interface BaseScore extends Entity {
  type: ScoreNames
  userIds: string[]
}

export interface Score extends BaseScore {
  value: number
}

export enum ScoreNames {
  stars = 'stars',
  likes = 'likes',
  rejects = 'rejects'
}

export const makeGetScore = (scores: Score[]) => (
  type: ScoreNames
): Maybe<Score> => List.find(s => s.type === type, scores)

const makeEmptyScore = (type: ScoreNames): Score => ({
  type,
  userIds: [],
  value: 0
})

export const genEmptyScores = (): Score[] => {
  return Object.values(ScoreNames).map(makeEmptyScore)
}

const filterUserIds = (s: BaseScore) => ({
  ...s,
  userIds: [...new Set(s.userIds)]
})

const calculateValue = (s: BaseScore) => ({
  ...s,
  value: s.userIds.length
})

export const makeScore = ({ type, userIds }: BaseScore): Either<Error, Score> =>
  Right({ type, userIds })
    .map(filterUserIds)
    .map(calculateValue)
