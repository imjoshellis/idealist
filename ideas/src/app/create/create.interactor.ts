import { EitherAsync } from 'purify-ts'
import { CreateInput } from './create.in'
import { CreateOutput } from './create.out'
import { CreateRepository } from './create.repository'

type CreateInteractor = (input: CreateInput) => CreateOutput
type MakeCreateInteractor = (deps: {
  ideaDb: CreateRepository
}) => CreateInteractor

export const makeCreateInteractor: MakeCreateInteractor = ({
  ideaDb
}) => idea =>
  EitherAsync.liftEither(idea).chain(({ id, text, userId, scores }) =>
    EitherAsync(() => ideaDb.insert({ id, text, userId, scores }))
  )
