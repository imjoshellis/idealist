import { generateMakeIdeaProps } from '../__test__'
import { makeAddIdea } from './add-idea'

describe('add idea', () => {
  const ideaDb = {
    insert: (obj: any) => obj
  }

  it('inserts idea into db without error', async () => {
    const addIdea = makeAddIdea({ ideaDb })
    const newIdea = generateMakeIdeaProps()
    expect(await addIdea(newIdea)).toBeDefined()
  })

  it('saves the id, userId, and text to the db', async () => {
    const addIdea = makeAddIdea({ ideaDb })
    const newIdea = generateMakeIdeaProps()
    const inserted = await addIdea(newIdea)
    expect(inserted.id).toBe(newIdea.id)
    expect(inserted.text).toBe(newIdea.text)
    expect(inserted.userId).toBe(newIdea.userId)
  })

  it('saves the score counts to the db', async () => {
    const addIdea = makeAddIdea({ ideaDb })
    const newIdea = generateMakeIdeaProps()
    const inserted = await addIdea(newIdea)
    const scoreCounts = ['starCount', 'likeCount', 'rejectCount']
    for (const type of scoreCounts) {
      expect(inserted[type]).toBe(0)
    }
  })
})
