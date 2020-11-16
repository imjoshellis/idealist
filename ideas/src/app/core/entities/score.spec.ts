import { makeScore } from '.'

describe('score', () => {
  it('has a list of users who have starred', () => {
    const userStars = ['a', 'b', 'c']
    expect(makeScore({ userStars }).getUserStars()).toEqual(userStars)
  })

  it('does not allow duplicates on userStars', () => {
    const userStars = ['a', 'b', 'c', 'c']
    expect(makeScore({ userStars }).getUserStars()).toEqual(['a', 'b', 'c'])
  })
})
