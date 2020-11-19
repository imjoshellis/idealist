import { makeIdea, ScoreNames } from '..'
import { forEveryScoreName, generateMakeIdeaProps } from '../../../__test__'
import { Id } from '../core.deps'

describe('idea', () => {
  it('has text', () => {
    const props = generateMakeIdeaProps()
    const idea = makeIdea(props).unsafeCoerce()
    expect(idea.text).toBe(props.text)
  })

  it('must have valid text', () => {
    const props = generateMakeIdeaProps({ text: '' })
    expect(makeIdea(props).isLeft()).toBe(true)
    expect(() => makeIdea(props).unsafeCoerce()).toThrow()
  })

  it('sanitizes text', () => {
    const unsafeText = '<script>arst</script>text'
    const props = generateMakeIdeaProps({ text: unsafeText })
    const idea = makeIdea(props).unsafeCoerce()
    expect(idea.text).toBe('text')
  })

  it('trims text whitespace', () => {
    const text = 'text   '
    const props = generateMakeIdeaProps({ text })
    const idea = makeIdea(props).unsafeCoerce()
    expect(idea.text).toBe(text.trim())
  })

  it('has a valid id', () => {
    const props = generateMakeIdeaProps({ id: undefined })
    const idea = makeIdea(props).unsafeCoerce()
    expect(Id.isValid(idea.id)).toBe(true)
  })

  it('rejects invalid ids', () => {
    const props = generateMakeIdeaProps({ id: 'bad id' })
    expect(Id.isValid(props.id)).toBe(false)
    expect(makeIdea(props).isLeft()).toBe(true)
  })

  it('has a userId', () => {
    const userId = 'id'
    const props = generateMakeIdeaProps({ userId })
    const idea = makeIdea(props).unsafeCoerce()
    expect(idea.userId).toBe(userId)
  })

  it('starts with empty scores', () => {
    const props = generateMakeIdeaProps()
    const test = (type: ScoreNames) => {
      const idea = makeIdea(props).unsafeCoerce()
      const score = idea.getScore(type).unsafeCoerce()
      expect(score.value).toBe(0)
    }
    forEveryScoreName(test)
  })
})
