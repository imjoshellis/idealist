import { Either, Right } from 'purify-ts'
import { BaseScore, Score } from './score.types'
import { calculateValue, filterUserIds } from './score.utils'

const makeScore = ({ type, userIds }: BaseScore): Either<Error, Score> =>
  Right({ type, userIds })
    .map(filterUserIds)
    .map(calculateValue)

export { makeScore }
