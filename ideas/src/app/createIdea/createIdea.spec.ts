import { generateMakeIdeaProps } from '../../__test__'
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

  it('initializes with empty score', async () => {
    const addIdea = makeCreateIdea({ ideaDb })
    const newIdea = generateMakeIdeaProps()
    const inserted = await addIdea(newIdea)
    expect(inserted.userStars).toEqual([])
    expect(inserted.userLikes).toEqual([])
    expect(inserted.userRejects).toEqual([])
    expect(inserted.starScore).toEqual(0)
    expect(inserted.likeScore).toEqual(0)
    expect(inserted.rejectScore).toEqual(0)
  })
})
