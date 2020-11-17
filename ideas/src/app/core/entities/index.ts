import { ObjectId } from 'mongodb'
import sanitizeHtml from 'sanitize-html'
import { ScoreNames } from '../types'
import { buildMakeIdea } from './idea'
import { makeScore, getScore } from './score'

const sanitize = (text: string) => sanitizeHtml(text)
const Id = Object.freeze({
  makeId: () => new ObjectId().toHexString(),
  isValid: (id: string) => ObjectId.isValid(id)
})

const makeScores = () => {
  return Object.values(ScoreNames).map(type => makeScore({ type }))
}
const makeIdea = buildMakeIdea({ sanitize, Id, makeScores, getScore })

export { Id, makeScores, makeIdea, makeScore }
