import { ObjectId } from 'mongodb'
import sanitizeHtml from 'sanitize-html'
import { buildMakeIdea } from './entities/idea'
import { makeEmptyScore, makeScore, Score, ScoreNames } from './entities/score'

const sanitize = (text: string) => sanitizeHtml(text)
const Id = Object.freeze({
  makeId: () => new ObjectId().toHexString(),
  isValid: (id: string) => ObjectId.isValid(id)
})

const generateEmptyScores = (): Score[] => {
  return Object.values(ScoreNames).map(type => makeEmptyScore({ type }))
}
const makeIdea = buildMakeIdea({ sanitize, Id, generateEmptyScores })

export * from './entities/idea'
export * from './entities/score'
export { Id, makeIdea, makeScore }
