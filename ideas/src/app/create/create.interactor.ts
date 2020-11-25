import { Either, EitherAsync } from 'purify-ts'
import { FullIdea } from '../core'
import { RepositoryIdea } from './../app.types'
import { CreateInput } from './create.in'
import { CreateOutput } from './create.out'
import { CreateRepository } from './create.repository'

type CreateInteractor = (input: CreateInput) => CreateOutput
type MakeCreateInteractor = (deps: {
  ideaDb: CreateRepository
}) => CreateInteractor

const convert = (i: FullIdea): RepositoryIdea => ({
  ...i,
  scores: Either.rights(i.scores)
})

export const makeCreateInteractor: MakeCreateInteractor = ({
  ideaDb
}) => idea =>
  EitherAsync.liftEither(idea)
    .map(convert)
    .chain(({ id, text, userId, scores }) =>
      EitherAsync(async () => await ideaDb.insert({ id, text, userId, scores }))
    )
