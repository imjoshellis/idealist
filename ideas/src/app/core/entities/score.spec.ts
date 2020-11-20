import { makeScore, ScoreNames } from '..'
import { forEveryScoreName } from '../../../__test__'

describe('score', () => {
  const userIds = ['a', 'b', 'c']

  it('has a list of users', () => {
    const test = (type: ScoreNames) => {
      const score = makeScore({ type, userIds }).unsafeCoerce()
      expect(score.userIds).toEqual(userIds)
    }
    forEveryScoreName(test)
  })

  it('creates correct values', () => {
    const test = (type: ScoreNames) => {
      const score = makeScore({ type, userIds }).unsafeCoerce()
      expect(score.value).toEqual(userIds.length)
    }
    forEveryScoreName(test)
  })

  it('removes duplicates', () => {
    const userIds = ['a', 'b', 'c', 'c']
    const uniqueUsers = ['a', 'b', 'c']
    const test = (type: ScoreNames) => {
      const score = makeScore({ type, userIds }).unsafeCoerce()
      expect(score.userIds).toEqual(uniqueUsers)
      expect(score.value).toEqual(uniqueUsers.length)
    }
    forEveryScoreName(test)
  })
})
