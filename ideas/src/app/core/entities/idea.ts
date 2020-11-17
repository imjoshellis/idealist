import { pipe } from 'fp-ts/lib/function'
import {
  BuildMakeIdeaProps,
  Idea,
  MakeIdea,
  MaybeIdea
} from '../types/IdeaTypes'

export const buildMakeIdea = ({
  sanitize,
  Id: { isValid, makeId },
  makeScores
}: BuildMakeIdeaProps): MakeIdea => {
  return ({
    text: unsafeText,
    id = makeId(),
    userId,
    scores = makeScores()
  }: MaybeIdea): Idea => {
    if (!isValid(id)) throw new Error('Idea must have valid id')

    const text = pipe(unsafeText, sanitize, x => x.trim())
    if (!text || text.length < 2) throw new Error('Idea must have valid text')

    return Object.freeze({
      text,
      id,
      userId,
      scores
    })
  }
}
