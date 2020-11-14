interface Action {
  type: string
  payload?: string
}

export enum ideaActionTypes {
  ADD_IDEA = 'ADD_IDEA'
}

export const ideaReducer = (state: string[], action: Action) => {
  switch (action.type) {
    case ideaActionTypes.ADD_IDEA:
      return [...state, action.payload]
    default:
      return state
  }
}
