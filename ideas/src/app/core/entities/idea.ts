import { BuildMakeIdeaProps, MakeIdeaProps } from '../types'

export const buildMakeIdea = ({
  sanitize,
  Id,
  makeScore
}: BuildMakeIdeaProps) => {
  return ({
    text,
    id = Id.makeId(),
    userId,
    score = makeScore()
  }: MakeIdeaProps) => {
    if (!Id.isValid(id)) throw new Error('Idea must have valid id')

    const sanitizedText = sanitize(text).trim()
    if (!sanitizedText || sanitizedText.length < 2)
      throw new Error('Idea must have valid text')

    return Object.freeze({
      getText: () => sanitizedText,
      getId: () => id,
      getUserId: () => userId,
      score: () => score
    })
  }
}
