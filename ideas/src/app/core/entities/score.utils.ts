import { List, Maybe } from 'purify-ts'
import { BaseScore, Score, ScoreNames } from './score.types'

const buildGetScore = (scores: Score[]) => (type: ScoreNames): Maybe<Score> =>
  List.find(s => s.type === type, scores)

const makeEmptyScore = (type: ScoreNames): Score => ({
  type,
  userIds: [],
  value: 0
})

const makeEmptyScores = (): Score[] => {
  return Object.values(ScoreNames).map(makeEmptyScore)
}

const filterUserIds = (s: BaseScore): BaseScore => ({
  ...s,
  userIds: [...new Set(s.userIds)]
})

const calculateValue = (s: BaseScore): Score => ({
  ...s,
  value: s.userIds.length
})

export {
  buildGetScore,
  makeEmptyScore,
  makeEmptyScores,
  filterUserIds,
  calculateValue
}
