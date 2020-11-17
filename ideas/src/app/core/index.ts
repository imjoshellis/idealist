import { ObjectId } from 'mongodb'
import sanitizeHtml from 'sanitize-html'
import { buildMakeIdea } from './entities/idea'
import { makeScore, ScoreNames } from './entities/score'

const sanitize = (text: string) => sanitizeHtml(text)
const Id = Object.freeze({
  makeId: () => new ObjectId().toHexString(),
  isValid: (id: string) => ObjectId.isValid(id)
})

const makeScores = () => {
  return Object.values(ScoreNames).map(type => makeScore({ type }))
}
const makeIdea = buildMakeIdea({ sanitize, Id, makeScores })

export * from './entities/idea'
export * from './entities/score'
export { Id, makeScores, makeIdea, makeScore }
