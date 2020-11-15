import { buildMakeIdea } from './idea'
import sanitizeHtml from 'sanitize-html'
import mongoose from 'mongoose'

const sanitize = (text: string) => sanitizeHtml(text)
export const Id = Object.freeze({
  makeId: () => mongoose.Types.ObjectId().toHexString(),
  isValid: (id: string) => mongoose.Types.ObjectId.isValid(id)
})

export const makeIdea = buildMakeIdea({ sanitize, Id })
