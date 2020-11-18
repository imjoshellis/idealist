import { ErrorEither } from './../app/core/definitions/ErrorEither'
import faker from 'faker'
import * as E from 'fp-ts/lib/Either'
import * as O from 'fp-ts/lib/Option'
import { ObjectId } from 'mongodb'
import { ScoreNames } from '../app/core'

export const generateMakeIdeaProps = (overrides?: any) => {
  const idea = {
    text: faker.lorem.sentence(),
    id: new ObjectId().toHexString(),
    userId: new ObjectId().toHexString()
  }

  return { ...idea, ...overrides }
}

export const forEveryScoreName = (fn: (name: ScoreNames) => void): void => {
  for (const name of Object.values(ScoreNames)) {
    fn(name)
  }
}

export const forEveryScoreNameAsync = async (
  fn: (name: ScoreNames) => Promise<void>
): Promise<void> => {
  for (const name of Object.values(ScoreNames)) {
    await fn(name)
  }
}

export const _unsafeExtractEither = <T>(e: ErrorEither<T>): T => {
  if (E.isLeft(e)) throw new Error()
  return e.right
}

export const _unsafeExtractOption = <T>(o: O.Option<T>): T => {
  if (O.isNone(o)) throw new Error()
  return o.value
}
