import { pipe } from 'fp-ts/lib/function'
import { Id, makeIdea } from '.'
import { generateMakeIdeaProps, _unsafeExtractScore } from '../../../__test__'
import { ScoreNames } from '../types'
import { forEveryScoreName } from './../../../__test__/index'

describe('idea', () => {
  it('has text', () => {
    const props = generateMakeIdeaProps()
    expect(makeIdea(props).text).toBe(props.text)
  })

  it('must have valid text', () => {
    const props = generateMakeIdeaProps({ text: '' })
    expect(() => makeIdea(props)).toThrow()
  })

  it('sanitizes text', () => {
    const unsanitizedText = '<script>arst</script>text'
    const props = generateMakeIdeaProps({ text: unsanitizedText })
    expect(makeIdea(props).text).toBe('text')
  })

  it('trims text whitespace', () => {
    const text = 'text   '
    const props = generateMakeIdeaProps({ text })
    expect(makeIdea(props).text).toBe(text.trim())
  })

  it('has an id', () => {
    const props = generateMakeIdeaProps({ id: undefined })
    expect(Id.isValid(makeIdea(props).id)).toBe(true)
  })

  it('rejects invalid ids', () => {
    const props = generateMakeIdeaProps({ id: 'bad id' })
    expect(Id.isValid(props.id)).toBe(false)
    expect(() => makeIdea(props)).toThrow()
  })

  it('has a userId', () => {
    const userId = 'id'
    const props = generateMakeIdeaProps({ userId })
    expect(makeIdea(props).userId).toBe(userId)
  })

  it('starts with empty scores', () => {
    const props = generateMakeIdeaProps()
    const test = (type: ScoreNames) => {
      const idea = makeIdea(props)
      const score = pipe(type, idea.getScoreByType, _unsafeExtractScore)
      expect(score.value).toBe(0)
    }
    forEveryScoreName(test)
  })
})
