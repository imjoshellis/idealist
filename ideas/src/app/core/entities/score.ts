import { eqString } from 'fp-ts/Eq'
import * as ROA from 'fp-ts/lib/ReadonlyArray'
import { MakerFunction } from '../definitions/MakerFunction'

export type Score = Readonly<{
  type: ScoreNames
  userIds: readonly string[]
  value: number
}>

export type PartialScore = Readonly<{
  type: ScoreNames
  userIds?: readonly string[]
  value?: number
}>

export enum ScoreNames {
  stars = 'stars',
  likes = 'likes',
  rejects = 'rejects'
}

export const makeScore: MakerFunction<PartialScore, Score> = ({
  type,
  userIds: newUserIds = []
}) => {
  const userIds = ROA.uniq(eqString)(newUserIds)
  const value = userIds.length
  return Object.freeze({ type, userIds, value })
}
