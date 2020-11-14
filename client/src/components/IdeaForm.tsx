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
    const trimmedIdea = idea.trim()
    onSubmit({ idea: trimmedIdea })
    setIdea('')
  }
  return (
    <form onSubmit={handleSubmit} data-testid='idea-form'>
      <div className='flex flex-row justify-between'>
        <label htmlFor='idea' className='visuallyhidden'>
          idea
        </label>
        <input
          type='text'
          name='idea'
          id='idea'
          value={idea}
          className='bg-surface-700 p-4 rounded flex-grow mr-4'
          onChange={e => setIdea(e.target.value)}
        />
        <button
          type='submit'
          className='uppercase font-bold bg-success-500 px-8 py-4 rounded'
        >
          add
        </button>
      </div>
    </form>
  )
}

export default IdeaForm
