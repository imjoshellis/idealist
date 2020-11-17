import { pipe } from 'fp-ts/lib/function'
import { Score } from '../types'
import { MakeIdea } from '../types/IdeaTypes'
import { GetScore } from './score'

type BuildMakeIdea = (props: {
  sanitize: (text: string) => string
  makeScores: () => Score[]
  getScore: GetScore
  Id: {
    makeId: () => string
    isValid: (id: string) => boolean
  }
}) => MakeIdea

export const buildMakeIdea: BuildMakeIdea = ({
  sanitize,
  Id: { isValid, makeId },
  makeScores,
  getScore
}) => {
  return ({
    text: unsafeText,
    id = makeId(),
    userId,
    scores = makeScores()
  }) => {
    if (!isValid(id)) throw new Error('Idea must have valid id')

    const text = pipe(unsafeText, sanitize, x => x.trim())
    if (!text || text.length < 2) throw new Error('Idea must have valid text')

    const getScoreByType = getScore(scores)

    return Object.freeze({
      text,
      id,
      userId,
      scores,
      getScoreByType
    })
  }
}
