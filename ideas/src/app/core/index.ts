import { ObjectId } from 'mongodb'
import sanitizeHtml from 'sanitize-html'
import { buildMakeIdea } from './entities/idea'
import { makeScore, makeGetScore, genEmptyScores } from './entities/score'
import { flow } from './fp/flow'

const Id = Object.freeze({
  makeId: () => new ObjectId().toHexString(),
  isValid: ObjectId.isValid
})

const Text = {
  sanitize: flow(sanitizeHtml, s => s.trim()),
  isValid: (s: string) => !!s
}

const makeIdea = buildMakeIdea({ Text, Id, makeGetScore, genEmptyScores })

export * from './entities/idea'
export * from './entities/score'
export { Id, Text, makeIdea, makeScore }
