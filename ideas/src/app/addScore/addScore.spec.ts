import { pipe } from 'fp-ts/lib/function'
import { forEveryScoreNameAsync, generateMakeIdeaProps } from '../../__test__'
import { ScoreNames } from '../core'
import { _unsafeExtractScore } from './../../__test__/index'
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
    const test = async (type: ScoreNames) => {
      const updatedIdea = await addScore({ id, userId, type })
      const { userIds, value } = pipe(
        type,
        updatedIdea.getScoreByType,
        _unsafeExtractScore
      )
      expect(userIds).toEqual([userId])
      expect(value).toEqual(1)
    }
    await forEveryScoreNameAsync(test)
  })

  it('throws if idea does not exist', async () => {
    const addScore = makeAddScore({ ideaDb })
    const type = ScoreNames.likes
    try {
      await addScore({ id: 'abc', userId, type })
      fail('Add score should have thrown an error')
    } catch (e) {
      expect(e.message).toBe('Idea not found')
    }
  })

  it('can increase scores on idea with existing score', async () => {
    const addScore = makeAddScore({ ideaDb })
    const userId1 = 'user1'
    const userId2 = 'user2'
    const test = async (type: ScoreNames) => {
      await addScore({ id, userId: userId1, type })
      const updatedIdea = await addScore({ id, userId: userId2, type })
      const { userIds, value } = pipe(
        type,
        updatedIdea.getScoreByType,
        _unsafeExtractScore
      )
      expect(userIds).toEqual([userId1, userId2])
      expect(value).toEqual(2)
    }
    await forEveryScoreNameAsync(test)
  })

  it('does not increase scores on idea if userId already exists', async () => {
    const addScore = makeAddScore({ ideaDb })
    const test = async (type: ScoreNames) => {
      await addScore({ id, userId, type })
      const updatedIdea = await addScore({ id, userId, type })
      const { userIds, value } = pipe(
        type,
        updatedIdea.getScoreByType,
        _unsafeExtractScore
      )
      expect(userIds).toEqual([userId])
      expect(value).toEqual(1)
    }
    await forEveryScoreNameAsync(test)
  })
})
