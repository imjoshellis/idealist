import { List, Maybe, NonEmptyList, Right } from 'purify-ts'
import { BaseScore, FullScore, Score, ScoreNames } from './score.types'

const buildGetScore = (scores: NonEmptyList<Score>) => (
  type: ScoreNames
): Maybe<Score> =>
  List.find(s => s.map(s => s.type).equals(Right(type)), scores)

const makeEmptyScore = (type: ScoreNames): Score =>
  Right({
    type,
    userIds: [],
    value: 0
  })

const makeEmptyScores = (): NonEmptyList<Score> =>
  (Object.values(ScoreNames) as NonEmptyList<ScoreNames>).map(makeEmptyScore)

const filterUserIds = (s: BaseScore): BaseScore => ({
  ...s,
  userIds: [...new Set(s.userIds)]
})

const calculateValue = (s: BaseScore): FullScore => ({
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
