import { buildMakeIdea } from './idea'
import sanitizeHtml from 'sanitize-html'
import mongoose from 'mongoose'

const sanitize = (text: string) => sanitizeHtml(text)
const Id = Object.freeze({
  makeId: () => mongoose.Types.ObjectId().toHexString()
})

export const makeIdea = buildMakeIdea({ sanitize, Id })
