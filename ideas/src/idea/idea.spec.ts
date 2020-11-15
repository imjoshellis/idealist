import { ScoreTypes } from './idea'
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

  it('starts with zero stars, likes, and rejects', () => {
    const props = generateMakeIdeaProps()
    for (let type of Object.values(ScoreTypes)) {
      expect(makeIdea(props).countScore({ type })).toBe(0)
    }
  })

  it('can add score types by userId', () => {
    const userId = 'id'
    const props = generateMakeIdeaProps()
    const idea = makeIdea(props)
    for (let type of Object.values(ScoreTypes)) {
      idea.addScore({ type, userId })
      expect(idea.countScore({ type })).toBe(1)
    }
  })

  it('cannot add repeat userId to scores', () => {
    const userId = 'id'
    const props = generateMakeIdeaProps()
    const idea = makeIdea(props)
    for (let type of Object.values(ScoreTypes)) {
      idea.addScore({ type, userId })
      expect(() => idea.addScore({ type, userId })).toThrow()
      expect(idea.countScore({ type })).toBe(1)
    }
  })

  it('can remove scores by userId', () => {
    const userId = 'id'
    const props = generateMakeIdeaProps()
    const idea = makeIdea(props)
    for (let type of Object.values(ScoreTypes)) {
      idea.addScore({ type, userId })
      expect(idea.countScore({ type })).toBe(1)
      idea.removeScore({ type, userId })
      expect(idea.countScore({ type })).toBe(0)
    }
  })

  it('cannot remove scores if userId never scored', () => {
    const userId = 'id'
    const otherUserId = 'id2'
    const props = generateMakeIdeaProps()
    const idea = makeIdea(props)
    for (let type of Object.values(ScoreTypes)) {
      idea.addScore({ type, userId })
      expect(idea.countScore({ type })).toBe(1)
      expect(() => idea.removeScore({ type, userId: otherUserId })).toThrow()
      expect(idea.countScore({ type })).toBe(1)
    }
  })
})
