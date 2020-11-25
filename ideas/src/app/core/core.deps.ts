import sanitizeHtml from 'sanitize-html'
import { ObjectId } from 'mongodb'

const Id = Object.freeze({
  makeId: () => new ObjectId().toHexString(),
  isValid: ObjectId.isValid
})

const Text = {
  sanitize: (s: string) => sanitizeHtml(s).trim(),
  isValid: (s: string) => s !== ''
}

export { Id, Text }
