import { taskEither as TE } from 'fp-ts'
import { pipe } from 'fp-ts/lib/function'
import {
  forEveryScoreName,
  generateMakeIdeaProps,
  _unsafeExtractEither,
  _unsafeExtractOption
} from '../../__test__'
import { makeIdea, ScoreNames } from '../core'
import { makeCreateIdea } from './createIdea'

describe('create idea', () => {
  const ideaDb = {
    insert: async (obj: any) => obj
  }

  it('saves the id, userId, and text to the db', async () => {
    const createIdea = makeCreateIdea({ ideaDb })
    const props = generateMakeIdeaProps()
    const idea = makeIdea(props)
    const inserted = await pipe(
      idea,
      createIdea,
      TE.getOrElse(e => {
        throw e
      })
    )()
    expect(inserted.id).toBe(props.id)
    expect(inserted.text).toBe(props.text)
    expect(inserted.userId).toBe(props.userId)
  })

  it('initializes with correct default score', async () => {
    const props = generateMakeIdeaProps()
    const idea = makeIdea(props)
    const createIdea = makeCreateIdea({ ideaDb })
    const inserted = await pipe(
      idea,
      createIdea,
      TE.getOrElse(e => {
        throw e
      })
    )()
    const test = (type: ScoreNames) => {
      const { userIds, value } = pipe(
        idea,
        _unsafeExtractEither,
        i => i.getScoreByType(type),
        _unsafeExtractOption
      )
      const score = inserted.scores.filter(s => s.type === type)[0]
      expect(userIds).toEqual(score.userIds)
      expect(value).toEqual(score.value)
    }
    forEveryScoreName(test)
  })
})
