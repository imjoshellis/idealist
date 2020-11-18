import { ErrorEither } from './../definitions/ErrorEither'
import { MakerFunctionFactory } from './../definitions/MakerFunctionFactory'
import { either as E, function as FP, option as O, array as A } from 'fp-ts'
import { Score, ScoreNames } from '..'

type BaseIdea = {
  id: string
  text: string
  userId: string
}

export type Idea = BaseIdea & {
  scores: Score[]
  getScoreByType: (type: ScoreNames) => O.Option<Score>
}

export type PartialIdea = BaseIdea & {
  scores?: Score[]
  getScoreByType: (type: ScoreNames) => O.Option<Score>
}

type Deps = {
  Id: { isValid: (s: string) => boolean; makeId: () => string }
  sanitize: (s: string) => string
  generateEmptyScores: () => Score[]
}

export const buildMakeIdea: MakerFunctionFactory<Deps, PartialIdea, Idea> = ({
  Id: { isValid, makeId },
  sanitize,
  generateEmptyScores
}) => ({
  id = makeId(),
  text: unsafeText,
  userId,
  scores = generateEmptyScores()
}): ErrorEither<Idea> => {
  if (!isValid(id)) return E.left(new Error('id is invalid'))

  const text = FP.pipe(unsafeText, sanitize, s => s.trim())
  if (!text) return E.left(new Error('text is invalid'))

  const getScoreByType = (type: ScoreNames): O.Option<Score> =>
    FP.pipe(
      scores,
      A.filter(s => s.type === type),
      A.head
    )

  return E.right({ id, text, userId, scores, getScoreByType })
}
