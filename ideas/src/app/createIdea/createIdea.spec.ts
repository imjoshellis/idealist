import { forEveryScoreKey, generateMakeIdeaProps } from '../../__test__'
import { makeIdea } from '../core/entities'
import { makeCreateIdea } from './createIdea'
import { ScoreKeys } from '../core/types'

describe('create idea', () => {
  const ideaDb = {
    insert: (obj: any) => obj
  }

  it('inserts idea into db without error', async () => {
    const createIdea = makeCreateIdea({ ideaDb })
    const props = generateMakeIdeaProps()
    expect(await createIdea(props)).toBeDefined()
  })

  it('saves the id, userId, and text to the db', async () => {
    const createIdea = makeCreateIdea({ ideaDb })
    const props = generateMakeIdeaProps()
    const inserted = await createIdea(props)
    expect(inserted.id).toBe(props.id)
    expect(inserted.text).toBe(props.text)
    expect(inserted.userId).toBe(props.userId)
  })

  it('initializes with correct default score', async () => {
    const props = generateMakeIdeaProps()
    const idea = makeIdea(props)
    const createIdea = makeCreateIdea({ ideaDb })
    const insertedIdea = await createIdea(props)
    const testScoreKey = (key: ScoreKeys) => {
      const { userIds, value } = insertedIdea.score[key]
      expect(userIds).toEqual(idea.score[key].userIds)
      expect(value).toEqual(idea.score[key].value)
    }
    forEveryScoreKey(testScoreKey)
  })
})
