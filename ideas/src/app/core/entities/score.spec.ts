import { makeScore } from '.'
import { ScoreNames } from '../types'

describe('score', () => {
  it('has a list of users for each type of score', () => {
    const users = ['a', 'b', 'c']
    for (const type of Object.values(ScoreNames)) {
      expect(makeScore({ [type]: users }).getUserIds(type)).toEqual(users)
    }
  })

  it('defaults to empty array if no users are given', () => {
    const score = makeScore()
    for (const type of Object.values(ScoreNames)) {
      expect(score.getUserIds(type)).toEqual([])
    }
  })

  it('can count each type of score', () => {
    const users = ['a', 'b', 'c']
    for (const type of Object.values(ScoreNames)) {
      expect(makeScore({ [type]: users }).getValue(type)).toEqual(users.length)
    }
  })

  it('removes duplicates', () => {
    const users = ['a', 'b', 'c', 'c']
    const uniqueUsers = ['a', 'b', 'c']
    for (const type of Object.values(ScoreNames)) {
      expect(makeScore({ [type]: users }).getUserIds(type)).toEqual(uniqueUsers)
      expect(makeScore({ [type]: users }).getValue(type)).toEqual(
        uniqueUsers.length
      )
    }
  })

  it('handles blank scores', () => {
    for (const type of Object.values(ScoreNames)) {
      expect(makeScore().getValue(type)).toEqual(0)
    }
  })
})
