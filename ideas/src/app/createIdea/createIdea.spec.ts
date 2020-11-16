import { generateMakeIdeaProps } from '../../__test__'
import { makeIdea } from '../core/entities'
import { ScoreNames } from '../core/types'
import { makeCreateIdea } from './createIdea'

describe('create idea', () => {
  const ideaDb = {
    insert: (obj: any) => obj
  }

  it('inserts idea into db without error', async () => {
    const addIdea = makeCreateIdea({ ideaDb })
    const newIdea = generateMakeIdeaProps()
    expect(await addIdea(newIdea)).toBeDefined()
  })

  it('saves the id, userId, and text to the db', async () => {
    const addIdea = makeCreateIdea({ ideaDb })
    const newIdea = generateMakeIdeaProps()
    const inserted = await addIdea(newIdea)
    expect(inserted.id).toBe(newIdea.id)
    expect(inserted.text).toBe(newIdea.text)
    expect(inserted.userId).toBe(newIdea.userId)
  })

  it('initializes with correct default score', async () => {
    const addIdea = makeCreateIdea({ ideaDb })
    const ideaProps = generateMakeIdeaProps()
    const idea = makeIdea(ideaProps)
    const insertedIdea = await addIdea(ideaProps)
    for (const type of Object.values(ScoreNames)) {
      const { userIds, value } = insertedIdea.score[type]
      expect(userIds).toEqual(idea.score().getUserIds(type))
      expect(value).toEqual(idea.score().getValue(type))
    }
  })
})
