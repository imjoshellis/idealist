import { either as E, function as FP } from 'fp-ts'
import { Id, makeIdea, ScoreNames } from '..'
import {
  forEveryScoreName,
  generateMakeIdeaProps,
  _unsafeExtractEither,
  _unsafeExtractOption
} from '../../../__test__'

describe('idea', () => {
  it('has text', () => {
    const props = generateMakeIdeaProps()
    const idea = FP.pipe(props, makeIdea, _unsafeExtractEither)
    expect(idea.text).toBe(props.text)
  })

  it('must have valid text', () => {
    const props = generateMakeIdeaProps({ text: '' })
    expect(E.isLeft(makeIdea(props))).toBe(true)
  })

  it('sanitizes text', () => {
    const unsafeText = '<script>arst</script>text'
    const props = generateMakeIdeaProps({ text: unsafeText })
    const idea = FP.pipe(props, makeIdea, _unsafeExtractEither)
    expect(idea.text).toBe('text')
  })

  it('trims text whitespace', () => {
    const text = 'text   '
    const props = generateMakeIdeaProps({ text })
    const idea = FP.pipe(props, makeIdea, _unsafeExtractEither)
    expect(idea.text).toBe(text.trim())
  })

  it('has a valid id', () => {
    const props = generateMakeIdeaProps({ id: undefined })
    const idea = FP.pipe(props, makeIdea, _unsafeExtractEither)
    expect(Id.isValid(idea.id)).toBe(true)
  })

  it('rejects invalid ids', () => {
    const props = generateMakeIdeaProps({ id: 'bad id' })
    expect(Id.isValid(props.id)).toBe(false)
    expect(E.isLeft(makeIdea(props))).toBe(true)
  })

  it('has a userId', () => {
    const userId = 'id'
    const props = generateMakeIdeaProps({ userId })
    const idea = FP.pipe(props, makeIdea, _unsafeExtractEither)
    expect(idea.userId).toBe(userId)
  })

  it('starts with empty scores', () => {
    const props = generateMakeIdeaProps()
    const test = (type: ScoreNames) => {
      const idea = FP.pipe(props, makeIdea, _unsafeExtractEither)
      const score = FP.pipe(type, idea.getScoreByType, _unsafeExtractOption)
      expect(score.value).toBe(0)
    }
    forEveryScoreName(test)
  })
})
