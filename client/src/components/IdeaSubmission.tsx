import React from 'react'
import IdeaForm, { IdeaFormData } from './IdeaForm'

interface IdeaSubmissionProps {}

export const IdeaSubmission: React.FC<IdeaSubmissionProps> = () => {
  const onSubmit = (data: IdeaFormData) => null
  return (
    <>
      <IdeaForm onSubmit={onSubmit} />
      <button>Done</button>
    </>
  )
}

export default IdeaSubmission
