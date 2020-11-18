import faker from 'faker'
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
