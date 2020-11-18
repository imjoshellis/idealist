import { Either, EitherAsync } from 'purify-ts'
import { Idea } from '../core'
import { InsertedIdea } from '../useCase.types'

type CreateIdea = (
  props: Either<Error, Idea>
) => EitherAsync<Error, InsertedIdea>

interface Deps {
  ideaDb: {
    insert: (obj: any) => Promise<InsertedIdea>
  }
}
export type MakeCreateIdea = (props: Deps) => CreateIdea

export const makeCreateIdea: MakeCreateIdea = ({ ideaDb }) => idea =>
  EitherAsync.liftEither(idea).chain(({ id, text, userId, scores }) =>
    EitherAsync(() => ideaDb.insert({ id, text, userId, scores }))
  )
