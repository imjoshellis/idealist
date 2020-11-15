import { makeIdea } from '.'

describe('idea', () => {
  it('can set and get text', () => {
    const text = 'idea'
    expect(makeIdea({ text }).getText()).toEqual(text)
  })
})
