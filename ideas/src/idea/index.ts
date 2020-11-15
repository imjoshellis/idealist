import { buildMakeIdea } from './idea'
import sanitizeHtml from 'sanitize-html'
import { ObjectId } from 'mongodb'

const sanitize = (text: string) => sanitizeHtml(text)
export const Id = Object.freeze({
  makeId: () => new ObjectId().toHexString(),
  isValid: (id: string) => ObjectId.isValid(id)
})

export const makeIdea = buildMakeIdea({ sanitize, Id })
