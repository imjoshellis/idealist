import { makeIdea } from '../core/entities'
import { MaybeIdea } from '../core/types'

export const makeCreateIdea = ({
  ideaDb
}: {
  ideaDb: { insert: (obj: any) => any }
}) => {
  return async (ideaProps: MaybeIdea) => {
    const idea = makeIdea({ ...ideaProps })

    const { id, text, userId, scores } = idea
    return ideaDb.insert({
      id,
      text,
      userId,
      scores
    })
  }
}
