import faker from 'faker'
import * as E from 'fp-ts/lib/Either'
import { ObjectId } from 'mongodb'
import { EitherScore, ScoreNames } from '../app/core/types'

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

export const _unsafeExtractScore = (eitherScore: EitherScore) => {
  if (E.isLeft(eitherScore)) throw eitherScore.left
  return eitherScore.right
}
