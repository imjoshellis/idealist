import { buildMakeIdea } from './idea'
import { buildMakeScore } from './score'
import sanitizeHtml from 'sanitize-html'
import { ObjectId } from 'mongodb'

const sanitize = (text: string) => sanitizeHtml(text)
export const Id = Object.freeze({
  makeId: () => new ObjectId().toHexString(),
  isValid: (id: string) => ObjectId.isValid(id)
})

export const makeScore = buildMakeScore()
export const makeIdea = buildMakeIdea({ sanitize, Id, makeScore })
