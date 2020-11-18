import { forEveryScoreNameAsync, generateMakeIdeaProps } from '../../__test__'
import { ScoreNames } from '../core'
import { makeCreateIdea } from '../createIdea/createIdea'
import { makeAddScore } from '../addScore/addScore'
import { makeRemoveScore } from './removeScore'

describe.skip('remove score', () => {
  let ideas: any[] = []
  const ideaDb = {
    insert: (obj: any) => {
      ideas.push(obj)
      return obj
    },
    findOne: ({ id }: { id: string }) => ideas.filter(i => i.id === id)[0],
    update: (obj: any) => {
      const updatedIdea = Object.assign(
        {},
        ideas.filter(i => i.id === obj.id)[0],
        obj
      )
      ideas = ideas.map(i => (i.id === updatedIdea.id ? updatedIdea : i))
      return updatedIdea
    }
  }

  let id: string
  const userId = 'user'

  beforeEach(async () => {
    const createIdea = makeCreateIdea({ ideaDb })
    id = (await createIdea(generateMakeIdeaProps())).id
    const addScore = makeAddScore({ ideaDb })
    const setupScoreDb = async (type: ScoreNames) => {
      await addScore({ id, userId, type })
    }
    await forEveryScoreNameAsync(setupScoreDb)
  })

  it('can remove score on an idea', async () => {
    const removeScore = makeRemoveScore({ ideaDb })
    const testScoreKey = async (type: ScoreNames) => {
      const updatedIdea = await removeScore({ id, userId, type })
      const { userIds, value } = updatedIdea.getScore(type).unsafeCoerce()
      expect(userIds).toEqual([])
      expect(value).toEqual(0)
    }
    await forEveryScoreNameAsync(testScoreKey)
  })

  it('throws if idea does not exist', async () => {
    const removeScore = makeRemoveScore({ ideaDb })
    const type = ScoreNames.likes
    try {
      await removeScore({ id: 'abc', userId, type })
      fail('Add score should have thrown an error')
    } catch (e) {
      expect(e.message).toBe('Idea not found')
    }
  })

  it('does nothing if userId does not exist', async () => {
    const removeScore = makeRemoveScore({ ideaDb })
    const testScoreKey = async (type: ScoreNames) => {
      const firstRemoval = await removeScore({ id, userId, type })
      const firstScore = firstRemoval.getScore(type).unsafeCoerce()
      expect(firstScore.userIds).toEqual([])
      expect(firstScore.value).toEqual(0)
      const secondRemoval = await removeScore({ id, userId, type })
      const secondScore = secondRemoval.getScore(type).unsafeCoerce()
      expect(secondScore.userIds).toEqual([])
      expect(secondScore.value).toEqual(0)
    }
    await forEveryScoreNameAsync(testScoreKey)
  })
})
