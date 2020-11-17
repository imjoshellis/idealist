import { eqString } from 'fp-ts/Eq'
import * as ROA from 'fp-ts/lib/ReadonlyArray'
import * as E from 'fp-ts/lib/Either'
import * as O from 'fp-ts/lib/Option'
import {
  EitherScore,
  PartialScore,
  Score,
  ScoreNames,
  ScoreNotFoundError
} from '.'
import { pipe } from 'fp-ts/lib/function'

export type MakeScore = (score: PartialScore) => Score
export const makeScore: MakeScore = ({ type, userIds: newUserIds = [] }) => {
  const userIds = ROA.uniq(eqString)(newUserIds)
  const value = userIds.length
  return Object.freeze({ type, userIds, value })
}

export type GetScoreByType = (type: ScoreNames) => EitherScore
export type GetScore = (scores: Score[]) => GetScoreByType
export const getScore: GetScore = scores => type => {
  const score = pipe(
    scores,
    ROA.filter(s => s.type === type),
    ROA.head,
    O.toNullable
  )
  if (!score) return E.left(ScoreNotFoundError.of())
  return E.right(score)
}
