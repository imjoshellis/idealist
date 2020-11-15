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

  it('sanitizes text', () => {
    const unsanitizedText = '<script>arst</script>text'
    expect(makeIdea({ text: unsanitizedText }).getText()).toBe('text')
  })

  it('trims text whitespace', () => {
    const text = 'text   '
    expect(makeIdea({ text }).getText()).toBe(text.trim())
  })
})
