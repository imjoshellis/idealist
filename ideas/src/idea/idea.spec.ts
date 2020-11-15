import { generateMakeIdeaProps } from './../test/test-utils'
import { makeIdea } from '.'

describe('idea', () => {
  it('can set and get text', () => {
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

  it('can set an id', () => {
    const props = generateMakeIdeaProps({ id: undefined })
    expect(makeIdea(props).getId()).toBeDefined()
  })
})
