import { makeRemoveScore } from './removeScore'

describe('remove score', () => {
  it('does nothing', () => {
    const removeScore = makeRemoveScore()
    expect(() => removeScore()).not.toThrow()
  })
})
