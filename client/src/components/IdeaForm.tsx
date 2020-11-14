import React, { useState } from 'react'

export interface IdeaFormData {
  idea: string
}

interface IdeaFormProps {
  onSubmit: (data: IdeaFormData) => void
}

export const IdeaForm: React.FC<IdeaFormProps> = ({ onSubmit }) => {
  const [idea, setIdea] = useState('')
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit({ idea })
    setIdea('')
  }
  return (
    <form onSubmit={handleSubmit} data-testid='idea-form'>
      <label htmlFor='idea' className='visuallyhidden'>
        idea
      </label>
      <input
        type='text'
        name='idea'
        id='idea'
        value={idea}
        onChange={e => setIdea(e.target.value)}
      />
      <button type='submit'>add</button>
    </form>
  )
}

export default IdeaForm
