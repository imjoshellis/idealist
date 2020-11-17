import * as E from 'fp-ts/lib/Either'

type Score = Readonly<{
  type: ScoreNames
  userIds: readonly string[]
  value: number
}>

type PartialScore = Readonly<{
  type: ScoreNames
  userIds?: readonly string[]
  value?: number
}>

type MaybeScore = PartialScore | Score

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

enum ScoreNames {
  stars = 'stars',
  likes = 'likes',
  rejects = 'rejects'
}

export {
  Score,
  PartialScore,
  ScoreNames,
  MaybeScore,
  EitherScore,
  ScoreNotFoundError
}
