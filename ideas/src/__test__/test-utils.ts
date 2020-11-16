import { ObjectId } from 'mongodb'
import faker from 'faker'

export const generateMakeIdeaProps = (overrides?: any) => {
  const idea = {
    text: faker.lorem.sentence(),
    id: new ObjectId().toHexString()
  }

  return { ...idea, ...overrides }
}
