import { array as A, eq as EQ, either as E } from 'fp-ts'
import { MakerFunction } from '../definitions/MakerFunction'

export type Score = {
  type: ScoreNames
  userIds: string[]
  value: number
}

export type PartialScore = {
  type: ScoreNames
  userIds?: string[]
  value?: number
}

export enum ScoreNames {
  stars = 'stars',
  likes = 'likes',
  rejects = 'rejects'
}

export const makeEmptyScore = ({ type }: PartialScore): Score => ({
  type,
  userIds: [],
  value: 0
})

export const makeScore: MakerFunction<PartialScore, Score> = ({
  type,
  userIds: newUserIds = []
}) => {
  const userIds = A.uniq(EQ.eqString)(newUserIds)
  const value = userIds.length
  return E.right({ type, userIds, value })
}
