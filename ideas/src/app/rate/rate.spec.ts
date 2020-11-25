// @ts-nocheck
import { makeCreateInteractor } from './../create/create.interactor'
import { CreateRepository } from './../create/create.repository'
import { RepositoryIdea } from './../app.types'
import { RateRepository } from './rate.repository'
import { makeRateInteractor } from './rate.interactor'
import { forEveryScoreNameAsync, generateMakeIdeaProps } from '../../__test__'
import { makeIdea, ScoreNames } from '../core'
import { List, MaybeAsync } from 'purify-ts'

describe.skip('rate', () => {
  const props = generateMakeIdeaProps()
  const idea = makeIdea(props)
  let ideas: RepositoryIdea[] = []
  const ideaDb: RateRepository & CreateRepository = {
    insert: async (obj: any) => {
      ideas.push(obj)
      return obj
    },
    findById: (id: string) =>
      MaybeAsync.liftMaybe(List.find(i => i.id === id, ideas)),
    update: async (obj: any) => {
      const updatedIdea = Object.assign(
        {},
        ideas.filter(i => i.id === obj.id)[0],
        obj
      )
      ideas = ideas.map(i => (i.id === updatedIdea.id ? updatedIdea : i))
      return updatedIdea
    }
  }

  const userId = 'user'

  beforeEach(async () => {
    await makeCreateInteractor({ ideaDb })(idea).run()
  })

  it('can increase scores on empty idea', async () => {
    const rateIdea = makeRateInteractor({ ideaDb })
    const test = async (type: ScoreNames): Promise<void> => {
      const updatedIdea = (
        await rateIdea({ idea, type, userId }).run()
      ).unsafeCoerce()
      const { userIds, value } = updatedIdea.scores.filter(
        s => s.type === type
      )[0]
      expect(userIds).toEqual([userId])
      expect(value).toEqual(1)
    }
    await forEveryScoreNameAsync(test)
  })
})
