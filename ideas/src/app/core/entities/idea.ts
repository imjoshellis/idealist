import { pipe } from 'fp-ts/lib/function'
import * as E from 'fp-ts/lib/Either'
import * as O from 'fp-ts/lib/Option'
import * as ROA from 'fp-ts/lib/ReadonlyArray'
import { Score, ScoreNames } from '..'
import { MakerFunctionFactory } from '../definitions/MakerFunctionFactory'

export type Deps = {
  sanitize: (text: string) => string
  makeScores: () => Score[]
  Id: {
    makeId: () => string
    isValid: (id: string) => boolean
  }
}

export type Idea = Readonly<{
  text: string
  id: string
  userId: string
  scores: Score[]
  getScoreByType: GetScoreByType
}>

export type PartialIdea = Readonly<{
  text: string
  id?: string
  userId: string
  scores?: Score[]
  getScoreByType?: GetScoreByType
}>

type GetScoreByType = (type: ScoreNames) => EitherScore

type EitherScore = E.Either<ScoreNotFoundError, Score>

class ScoreNotFoundError extends Error {
  public _tag: 'ScoreNotFoundError'

  private constructor () {
    super('Score not found')
    this._tag = 'ScoreNotFoundError'
  }

  public static of (): ScoreNotFoundError {
    return new ScoreNotFoundError()
  }
}

export const buildMakeIdea: MakerFunctionFactory<Deps, PartialIdea, Idea> = ({
  sanitize,
  Id: { isValid, makeId },
  makeScores
}) => {
  return ({
    text: unsafeText,
    id = makeId(),
    userId,
    scores = makeScores()
  }) => {
    if (!isValid(id)) throw new Error('Idea must have valid id')

    const text = pipe(unsafeText, sanitize, x => x.trim())
    if (!text || text.length < 1) throw new Error('Idea must have valid text')

    const getScoreByType: GetScoreByType = type => {
      const score = pipe(
        scores,
        ROA.filter(s => s.type === type),
        ROA.head,
        O.toNullable
      )
      if (!score) return E.left(ScoreNotFoundError.of())
      return E.right(score)
    }

    return Object.freeze({
      text,
      id,
      userId,
      scores,
      getScoreByType
    })
  }
}
