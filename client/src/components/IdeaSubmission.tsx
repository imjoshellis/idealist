import React from 'react'
import { useIdeas } from '../providers/IdeaProvider'
import { ideaActionTypes, ideaReducer } from '../reducers/ideaReducer'
import IdeaForm, { IdeaFormData } from './IdeaForm'

interface IdeaSubmissionProps {}

export const IdeaSubmission: React.FC<IdeaSubmissionProps> = () => {
  const [ideas, setIdeas] = useIdeas()
  const onSubmit = (data: IdeaFormData) => {
    const action = {
      type: ideaActionTypes.ADD_IDEA,
      payload: data.idea
    }
    setIdeas(ideaReducer(ideas, action) as string[])
  }
  return (
    <>
      <IdeaForm onSubmit={onSubmit} />
      <button>Done</button>
    </>
  )
}

export default IdeaSubmission
