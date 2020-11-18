import { taskEither as TE, either as E } from 'fp-ts'
import { MakeCreateIdea } from './createIdea.types'

export const makeCreateIdea: MakeCreateIdea = ({ ideaDb }) => {
  return idea => {
    if (E.isLeft(idea))
      return TE.left(new Error('there was a problem with the given idea'))
    const { id, text, userId, scores } = idea.right

    return TE.tryCatch(
      () =>
        ideaDb.insert({
          id,
          text,
          userId,
          scores
        }),
      () => new Error('saving to db failed')
    )
  }
}
