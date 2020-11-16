import { makeScore } from '.'

describe('score', () => {
  it('does nothing', () => {
    expect(() => makeScore()).not.toThrow()
  })
})
