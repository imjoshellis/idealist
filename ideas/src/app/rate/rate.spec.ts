import { RepositoryIdea } from './../app.types'
import { RateRepository } from './rate.repository'
import { makeRateInteractor } from './rate.interactor'

describe('rate', () => {
  const ideas = [] as RepositoryIdea[]
  const ideaDb: RateRepository = {
    findById: async (id: string) => ideas.find(i => i.id === id),
    update: async (obj: any) => obj
  }

  it('does nothing', () => {
    const createIdea = makeRateInteractor({ ideaDb })
    expect(createIdea).toBeDefined()
  })
})
