import { makeCreateIdea } from './../createIdea/createIdea'
import { generateMakeIdeaProps } from '../../__test__'
import { ScoreNames } from '../core/types'
import { makeAddScore } from './addScore'

describe('add score', () => {
  const ideas: any[] = []
  const ideaDb = {
    insert: (obj: any) => {
      ideas.push(obj)
      return obj
    },
    findOne: ({ id }: { id: string }) => ideas.filter(i => i.id === id)[0],
    update: (obj: any) =>
      Object.assign({}, ideas.filter(i => i.id === obj.id)[0], obj)
  }

  let idea: any

  beforeEach(async () => {
    const createIdea = makeCreateIdea({ ideaDb })
    idea = await createIdea(generateMakeIdeaProps())
  })

  it('can increase star score on empty idea', async () => {
    const addScore = makeAddScore({ ideaDb })
    const { id } = idea
    const userId = 'user'
    for (const type of Object.values(ScoreNames)) {
      const updatedIdea = await addScore({ id, userId, type })
      const { userIds, value } = updatedIdea.score[type]
      expect(userIds).toEqual([userId])
      expect(value).toEqual(1)
    }
  })
})
