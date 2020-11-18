import { Either, Maybe, Right } from 'purify-ts'
import { Score, ScoreNames } from '..'
import { Entity, validate } from './entity'

interface BaseIdea extends Entity {
  id: string
  text: string
  userId: string
}

export interface Idea extends BaseIdea {
  scores: Score[]
  getScore: (type: ScoreNames) => Maybe<Score>
}

export interface PartialIdea extends BaseIdea {
  scores?: Score[]
  getScore: (type: ScoreNames) => Maybe<Score>
}

type Deps = {
  Id: { isValid: (s: string) => boolean; makeId: () => string }
  Text: { isValid: (s: string) => boolean; sanitize: (s: string) => string }
  genEmptyScores: () => Score[]
  makeGetScore: (scores: Score[]) => (type: ScoreNames) => Maybe<Score>
}

export const buildMakeIdea = ({
  Id,
  Text,
  genEmptyScores,
  makeGetScore
}: Deps) => ({
  id = Id.makeId(),
  scores = genEmptyScores(),
  ...args
}: PartialIdea): Either<Error, Idea> =>
  Right({ ...args, id, scores, getScore: makeGetScore(scores) })
    .chain(validate('id', Id.isValid))
    .map(i => ({ ...i, text: Text.sanitize(i.text) }))
    .chain(validate('text', Text.isValid))
