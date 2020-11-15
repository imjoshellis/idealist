import { generateMakeIdeaProps } from './../test/test-utils'
import { makeIdea, Id } from '.'

describe('idea', () => {
  it('has text', () => {
    const props = generateMakeIdeaProps()
    expect(makeIdea(props).getText()).toBe(props.text)
  })

  it('must have valid text', () => {
    const props = generateMakeIdeaProps({ text: '' })
    expect(() => makeIdea(props)).toThrow()
  })

  it('sanitizes text', () => {
    const unsanitizedText = '<script>arst</script>text'
    const props = generateMakeIdeaProps({ text: unsanitizedText })
    expect(makeIdea(props).getText()).toBe('text')
  })

  it('trims text whitespace', () => {
    const text = 'text   '
    const props = generateMakeIdeaProps({ text })
    expect(makeIdea(props).getText()).toBe(text.trim())
  })

  it('has an id', () => {
    const props = generateMakeIdeaProps({ id: undefined })
    expect(Id.isValid(makeIdea(props).getId())).toBe(true)
  })

  it('rejects invalid ids', () => {
    const props = generateMakeIdeaProps({ id: 'bad id' })
    expect(Id.isValid(props.id)).toBe(false)
    expect(() => makeIdea(props)).toThrow()
  })

  it('has a userId', () => {
    const userId = 'id'
    const props = generateMakeIdeaProps({ userId })
    expect(makeIdea(props).getUserId()).toBe(userId)
  })

  it('starts with zero stars', () => {
    const props = generateMakeIdeaProps()
    expect(makeIdea(props).countStars()).toBe(0)
  })

  it('can add stars by userId', () => {
    const userId = 'id'
    const props = generateMakeIdeaProps()
    const idea = makeIdea(props)
    idea.addStar(userId)
    expect(idea.countStars()).toBe(1)
  })

  it('cannot add stars with userId twice', () => {
    const userId = 'id'
    const props = generateMakeIdeaProps()
    const idea = makeIdea(props)
    idea.addStar(userId)
    expect(() => idea.addStar(userId)).toThrow()
    expect(idea.countStars()).toBe(1)
  })

  it('can remove stars by userId', () => {
    const userId = 'id'
    const props = generateMakeIdeaProps()
    const idea = makeIdea(props)
    idea.addStar(userId)
    expect(idea.countStars()).toBe(1)
    idea.removeStar(userId)
    expect(idea.countStars()).toBe(0)
  })

  it('cannot remove stars if userId never starred', () => {
    const userId = 'id'
    const otherUserId = 'id2'
    const props = generateMakeIdeaProps()
    const idea = makeIdea(props)
    idea.addStar(userId)
    expect(idea.countStars()).toBe(1)
    expect(() => idea.removeStar(otherUserId)).toThrow()
    expect(idea.countStars()).toBe(1)
  })
})
