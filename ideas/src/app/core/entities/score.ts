import { eqString } from 'fp-ts/Eq'
import { uniq } from 'fp-ts/lib/ReadonlyArray'
import { MakeScore, MaybeScore, Score, ScoreNames } from '../types/ScoreTypes'

export const makeScore: MakeScore = ({
  type,
  userIds: userIdsProp = []
}): Score => {
  const userIds = uniq(eqString)(userIdsProp)
  const value = userIds.length
  return Object.freeze({ type, userIds, value })
}

export const getScore = (type: ScoreNames) => (
  scores: MaybeScore[]
): MaybeScore => {
  return scores.filter(s => s.type === type)[0]
}
