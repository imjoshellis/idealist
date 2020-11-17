import { makeIdea } from '../core'
import { MakeCreateIdea } from './createIdea.types'

export const makeCreateIdea: MakeCreateIdea = ({ ideaDb }) => {
  return async ideaProps => {
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
