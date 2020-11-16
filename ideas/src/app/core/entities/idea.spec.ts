import { generateMakeIdeaProps } from '../../../__test__'
import { makeIdea, Id } from '.'
import { ScoreNames } from '../types'

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

  it('starts with empty score', () => {
    const props = generateMakeIdeaProps()
    for (let type of Object.values(ScoreNames)) {
      expect(
        makeIdea(props)
          .score()
          .getValue(type)
      ).toBe(0)
    }
  })
})
