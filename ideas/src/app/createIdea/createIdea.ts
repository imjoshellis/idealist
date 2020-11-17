import { makeIdea } from '../core/entities'
import { Idea, MaybeIdea } from '../core/types'
import { InsertedIdea } from '../useCaseTypes'

type CreateIdea = (props: MaybeIdea) => Promise<Idea>

interface MakeCreateIdeaProps {
  ideaDb: {
    insert: (obj: any) => Promise<InsertedIdea>
  }
}
type MakeCreateIdea = (props: MakeCreateIdeaProps) => CreateIdea

export const makeCreateIdea: MakeCreateIdea = ({ ideaDb }) => {
  return async (ideaProps: MaybeIdea) => {
    const idea = makeIdea({ ...ideaProps })

    const { id, text, userId, scores } = idea
    await ideaDb.insert({
      id,
      text,
      userId,
      scores
    })

    return idea
  }
}
