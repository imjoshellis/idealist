import { generateMakeIdeaProps } from '../../__test__'
import { ScoreNames } from '../core/types'
import { makeCreateIdea } from '../createIdea/createIdea'
import { makeAddScore } from './../addScore/addScore'
import { makeRemoveScore } from './removeScore'

describe('remove score', () => {
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
    for (const type of Object.values(ScoreNames)) {
      addScore({ id, userId, type })
    }
  })

  it('can remove score on an idea', async () => {
    const removeScore = makeRemoveScore({ ideaDb })
    for (const type of Object.values(ScoreNames)) {
      const updatedIdea = await removeScore({ id, userId, type })
      const { userIds, value } = updatedIdea.score[type]
      expect(userIds).toEqual([])
      expect(value).toEqual(0)
    }
  })

  it('throws if idea does not exist', async () => {
    const removeScore = makeRemoveScore({ ideaDb })
    const type = ScoreNames.STARS
    try {
      await removeScore({ id: 'abc', userId, type })
      fail('Add score should have thrown an error')
    } catch (e) {
      expect(e.message).toBe('Idea not found')
    }
  })

  it('does nothing if userId does not exist', async () => {
    const removeScore = makeRemoveScore({ ideaDb })
    for (const type of Object.values(ScoreNames)) {
      const firstRemoval = await removeScore({ id, userId, type })
      const firstScore = firstRemoval.score[type]
      expect(firstScore.userIds).toEqual([])
      expect(firstScore.value).toEqual(0)
      const secondRemoval = await removeScore({ id, userId, type })
      const secondScore = secondRemoval.score[type]
      expect(secondScore.userIds).toEqual([])
      expect(secondScore.value).toEqual(0)
    }
  })
})
