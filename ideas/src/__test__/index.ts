import { ObjectId } from 'mongodb'
import faker from 'faker'
import { ScoreKeys } from '../app/core/types'

export const generateMakeIdeaProps = (overrides?: any) => {
  const idea = {
    text: faker.lorem.sentence(),
    id: new ObjectId().toHexString(),
    userId: new ObjectId().toHexString()
  }

  return { ...idea, ...overrides }
}

export const forEveryScoreKey = (fn: (key: ScoreKeys) => void): void => {
  for (const key of Object.values(ScoreKeys)) {
    fn(key)
  }
}

export const forEveryScoreKeyAsync = async (
  fn: (key: ScoreKeys) => Promise<void>
): Promise<void> => {
  for (const key of Object.values(ScoreKeys)) {
    await fn(key)
  }
}
