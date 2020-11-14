import React, { useState } from 'react'
import { ideaActionTypes, ideaReducer } from '../reducers/ideaReducer'
import IdeaForm, { IdeaFormData } from './IdeaForm'

interface IdeaSubmissionProps {}

export const IdeaSubmission: React.FC<IdeaSubmissionProps> = () => {
  const onSubmit = (data: IdeaFormData) => {
    const state = [] as string[]
    const action = {
      type: ideaActionTypes.ADD_IDEA,
      payload: data.idea
    }
    ideaReducer(state, action)
  }
  return (
    <>
      <IdeaForm onSubmit={onSubmit} />
      <button>Done</button>
    </>
  )
}

export default IdeaSubmission
