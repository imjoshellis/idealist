import { ideaReducer, ideaActionTypes } from './../reducers/ideaReducer'
describe('ideaReducer', () => {
  it('returns state as-is if given bad action type', () => {
    const state = ['hi']
    expect(ideaReducer(state, { type: 'not a type' })).toEqual(state)
  })

  it('can add an idea to state', () => {
    const state = [] as string[]
    const action = {
      type: ideaActionTypes.ADD_IDEA,
      payload: 'new idea'
    }
    expect(ideaReducer(state, action)).toEqual([action.payload])
  })
})
