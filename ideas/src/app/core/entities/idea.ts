import { Maybe, NonEmptyList, Right } from 'purify-ts'
import { Score, ScoreNames } from '../entities/score.types'
import { validate } from './entity'
import { BaseIdea, Idea } from './idea.types'

interface Deps {
  Id: { isValid: (s: string) => boolean, makeId: () => string }
  Text: { isValid: (s: string) => boolean, sanitize: (s: string) => string }
  buildGetScore: (
    scores: NonEmptyList<Score>
  ) => (type: ScoreNames) => Maybe<Score>
}

export const buildMakeIdea = ({ Id, Text, buildGetScore }: Deps) => ({
  id = Id.makeId(),
  scores,
  ...args
}: BaseIdea): Idea =>
  Right({ ...args, id, scores, getScore: buildGetScore(scores) })
    .chain(validate('id', Id.isValid))
    .map(i => ({ ...i, text: Text.sanitize(i.text) }))
    .chain(validate('text', Text.isValid))
