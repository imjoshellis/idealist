import { forEveryScoreKey } from './../../../__test__/index'
import { makeScore } from '.'
import { ScoreKeys } from '../types'

describe('score', () => {
  const userIds = ['a', 'b', 'c']

  it('has a list of users for each type of score', () => {
    const testScoreKey = (key: ScoreKeys) => {
      expect(makeScore({ [key]: { userIds } })[key].userIds).toEqual(userIds)
    }
    forEveryScoreKey(testScoreKey)
  })

  it('defaults to empty array if no users are given', () => {
    const score = makeScore()
    const testScoreKey = (key: ScoreKeys) => {
      expect(score[key].userIds).toEqual([])
    }
    forEveryScoreKey(testScoreKey)
  })

  it('can count each type of score', () => {
    const testScoreKey = (key: ScoreKeys) => {
      expect(makeScore({ [key]: { userIds } })[key].value).toEqual(
        userIds.length
      )
    }
    forEveryScoreKey(testScoreKey)
  })

  it('removes duplicates', () => {
    const userIds = ['a', 'b', 'c', 'c']
    const uniqueUsers = ['a', 'b', 'c']
    const testScoreKey = (key: ScoreKeys) => {
      expect(makeScore({ [key]: { userIds } })[key].userIds).toEqual(
        uniqueUsers
      )
      expect(makeScore({ [key]: { userIds } })[key].value).toEqual(
        uniqueUsers.length
      )
    }
    forEveryScoreKey(testScoreKey)
  })

  it('handles blank scores', () => {
    const testScoreKey = (key: ScoreKeys) => {
      expect(makeScore()[key].value).toEqual(0)
    }
    forEveryScoreKey(testScoreKey)
  })
})
