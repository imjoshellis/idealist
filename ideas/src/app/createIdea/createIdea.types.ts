import { Idea } from '../core'
import { ErrorEither } from '../core/definitions/ErrorEither'
import { ErrorTaskEither } from '../core/definitions/ErrorTaskEither'
import { InsertedIdea } from '../useCase.types'

type CreateIdea = (props: ErrorEither<Idea>) => ErrorTaskEither<InsertedIdea>

interface MakeCreateIdeaProps {
  ideaDb: {
    insert: (obj: any) => Promise<InsertedIdea>
  }
}
export type MakeCreateIdea = (props: MakeCreateIdeaProps) => CreateIdea
