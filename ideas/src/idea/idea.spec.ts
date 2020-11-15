import { makeIdea } from '.'

describe('idea', () => {
  it('can set and get text', () => {
    const text = 'idea'
    expect(makeIdea({ text }).getText()).toBe(text)
  })

  it('must have valid text', () => {
    const invalidText = ''
    expect(() => makeIdea({ text: invalidText })).toThrow()
  })
})
