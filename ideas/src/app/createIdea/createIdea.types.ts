import { Idea, MaybeIdea } from '../core'
import { InsertedIdea } from '../useCase.types'

type CreateIdea = (props: MaybeIdea) => Promise<Idea>

interface MakeCreateIdeaProps {
  ideaDb: {
    insert: (obj: any) => Promise<InsertedIdea>
  }
}
export type MakeCreateIdea = (props: MakeCreateIdeaProps) => CreateIdea
