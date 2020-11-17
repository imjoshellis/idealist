import { forEveryScoreKeyAsync, generateMakeIdeaProps } from '../../__test__'
import { ScoreKeys } from '../core/types'
import { makeCreateIdea } from './../createIdea/createIdea'
import { makeAddScore } from './addScore'

describe('add score', () => {
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
  })

  it('can increase scores on empty idea', async () => {
    const addScore = makeAddScore({ ideaDb })
    const testScoreKey = async (key: ScoreKeys) => {
      const updatedIdea = await addScore({ id, userId, key })
      const { userIds, value } = updatedIdea.score[key]
      expect(userIds).toEqual([userId])
      expect(value).toEqual(1)
    }
    await forEveryScoreKeyAsync(testScoreKey)
  })

  it('throws if idea does not exist', async () => {
    const addScore = makeAddScore({ ideaDb })
    const key = ScoreKeys.likes
    try {
      await addScore({ id: 'abc', userId, key })
      fail('Add score should have thrown an error')
    } catch (e) {
      expect(e.message).toBe('Idea not found')
    }
  })

  it('can increase scores on idea with existing score', async () => {
    const addScore = makeAddScore({ ideaDb })
    const userId1 = 'user1'
    const userId2 = 'user2'
    const testScoreKey = async (key: ScoreKeys) => {
      await addScore({ id, userId: userId1, key })
      const updatedIdea = await addScore({ id, userId: userId2, key })
      const { userIds, value } = updatedIdea.score[key]
      expect(userIds).toEqual([userId1, userId2])
      expect(value).toEqual(2)
    }
    await forEveryScoreKeyAsync(testScoreKey)
  })

  it('does not increase scores on idea if userId already exists', async () => {
    const addScore = makeAddScore({ ideaDb })
    const testScoreKey = async (key: ScoreKeys) => {
      await addScore({ id, userId, key })
      const updatedIdea = await addScore({ id, userId, key })
      const { userIds, value } = updatedIdea.score[key]
      expect(userIds).toEqual([userId])
      expect(value).toEqual(1)
    }
    await forEveryScoreKeyAsync(testScoreKey)
  })
})
