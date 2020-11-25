// @ts-nocheck
import { Idea } from './../core/entities/idea.types'
import { RepositoryIdea, RepositoryScore } from './../app.types'
import { Either, EitherAsync } from 'purify-ts'
import { RateInput } from './rate.in'
import { RateRepository } from './rate.repository'
import { makeIdea, makeScore, Score, ScoreNames } from '../core'

type RateInteractor = (input: RateInput) => EitherAsync<Error, RepositoryIdea>
type MakeRateInteractor = (deps: { ideaDb: RateRepository }) => RateInteractor

const replace = (
  arr: RepositoryScore[],
  targetType: ScoreNames,
  userId: string
): Score[] => {
  const [targetScore, ...rest] = arr.reduce(
    (acc: Array<Either<Error, Score>>, cur) =>
      cur.type === targetType
        ? [makeScore(cur), ...acc]
        : [...acc, makeScore(cur)],
    []
  )
  const updatedScore = {
    ...targetScore,
    userIds: [...targetScore.userIds, userId]
  }
  return [makeScore(updatedScore), ...rest]
}

const rateIdea = (
  type: ScoreNames,
  userId: string,
  i: RepositoryIdea
): Either<Error, Idea> =>
  makeIdea({ ...i, scores: replace(i.scores, type, userId) })

/*
 */

export const makeRateInteractor: MakeRateInteractor = ({ ideaDb }) => ({
  idea,
  type,
  userId
}) =>
  EitherAsync.liftEither(idea)
    .chain(idea =>
      ideaDb.findById(idea.id).toEitherAsync(new Error('idea not found'))
    )
    .chain(idea => EitherAsync.liftEither(rateIdea(type, userId, idea)))
    .chain(idea => {
      return EitherAsync(async () => await ideaDb.update(idea))
    })
