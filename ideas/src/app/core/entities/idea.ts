import { Either, Maybe, Right } from 'purify-ts'
import { Score, ScoreNames } from '../entities/score.types'
import { validate } from './entity'
import { Idea, PartialIdea } from './idea.types'

type Deps = {
  Id: { isValid: (s: string) => boolean; makeId: () => string }
  Text: { isValid: (s: string) => boolean; sanitize: (s: string) => string }
  makeEmptyScores: () => Score[]
  buildGetScore: (scores: Score[]) => (type: ScoreNames) => Maybe<Score>
}

export const buildMakeIdea = ({
  Id,
  Text,
  makeEmptyScores,
  buildGetScore
}: Deps) => ({
  id = Id.makeId(),
  scores = makeEmptyScores(),
  ...args
}: PartialIdea): Either<Error, Idea> =>
  Right({ ...args, id, scores, getScore: buildGetScore(scores) })
    .chain(validate('id', Id.isValid))
    .map(i => ({ ...i, text: Text.sanitize(i.text) }))
    .chain(validate('text', Text.isValid))
