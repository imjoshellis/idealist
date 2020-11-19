import { CreateRepository } from './create.repository'
import { forEveryScoreName, generateMakeIdeaProps } from '../../__test__'
import { makeIdea, ScoreNames } from '../core'
import { makeCreateInteractor } from './create.interactor'

describe('create', () => {
  const ideaDb: CreateRepository = {
    insert: async (obj: any) => obj
  }

  const createIdea = makeCreateInteractor({ ideaDb })
  const props = generateMakeIdeaProps()
  const idea = makeIdea(props)

  it('saves the id, userId, and text to the db', async () => {
    const inserted = (await createIdea(idea).run()).unsafeCoerce()
    expect(inserted.id).toBe(props.id)
    expect(inserted.text).toBe(props.text)
    expect(inserted.userId).toBe(props.userId)
  })

  it('fails if given a bad idea', async () => {
    const idea = makeIdea({ ...props, text: '' })
    expect(idea.isLeft()).toBe(true)
    const creator = createIdea(idea)
    expect((await creator.run()).isLeft()).toBe(true)
    const inserted = (await creator.run()).unsafeCoerce
    expect(() => inserted()).toThrow()
  })

  it('initializes with correct default score', async () => {
    const inserted = (await createIdea(idea).run()).unsafeCoerce()
    const test = (type: ScoreNames) => {
      const { userIds, value } = idea
        .unsafeCoerce()
        .getScore(type)
        .unsafeCoerce()
      const score = inserted.scores.filter(s => s.type === type)[0]
      expect(userIds).toEqual(score.userIds)
      expect(value).toEqual(score.value)
    }
    forEveryScoreName(test)
  })
})
