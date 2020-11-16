import {
  BuildMakeIdeaProps,
  Idea,
  MakeIdea,
  MakeIdeaProps
} from '../types/IdeaTypes'

export const buildMakeIdea = ({
  sanitize,
  Id,
  makeScore
}: BuildMakeIdeaProps): MakeIdea => {
  return ({
    text: unsafeText,
    id = Id.makeId(),
    userId,
    score = makeScore()
  }: MakeIdeaProps): Idea => {
    if (!Id.isValid(id)) throw new Error('Idea must have valid id')

    const text = sanitize(unsafeText).trim()
    if (!text || text.length < 2) throw new Error('Idea must have valid text')

    return Object.freeze({
      text,
      id,
      userId,
      score
    })
  }
}
