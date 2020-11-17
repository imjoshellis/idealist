import { pipe } from 'fp-ts/lib/function'
import { makeScore } from '.'
import { ScoreNames } from '../types'
import { forEveryScoreName } from './../../../__test__/index'

describe('score', () => {
  const userIds = ['a', 'b', 'c']

  it('has a list of users', () => {
    const testScores = (type: ScoreNames) => {
      const score = pipe({ type, userIds }, makeScore)
      expect(score.userIds).toEqual(userIds)
    }
    forEveryScoreName(testScores)
  })

  it('defaults to empty array if no users are given', () => {
    const testScores = (type: ScoreNames) => {
      const score = makeScore({ type })
      expect(score.userIds).toEqual([])
    }
    forEveryScoreName(testScores)
  })

  it('creates correct values', () => {
    const testScores = (type: ScoreNames) => {
      const score = pipe({ type, userIds }, makeScore)
      expect(score.value).toEqual(userIds.length)
    }
    forEveryScoreName(testScores)
  })

  it('removes duplicates', () => {
    const userIds = ['a', 'b', 'c', 'c']
    const uniqueUsers = ['a', 'b', 'c']
    const testScores = (type: ScoreNames) => {
      const score = pipe({ type, userIds }, makeScore)
      expect(score.userIds).toEqual(uniqueUsers)
      expect(score.value).toEqual(uniqueUsers.length)
    }
    forEveryScoreName(testScores)
  })
})
