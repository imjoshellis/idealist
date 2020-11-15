import faker from 'faker'
import mongoose from 'mongoose'

export const generateMakeIdeaProps = (overrides?: any) => {
  const idea = {
    text: faker.lorem.sentence(),
    id: mongoose.Types.ObjectId().toHexString()
  }

  return { ...idea, ...overrides }
}
