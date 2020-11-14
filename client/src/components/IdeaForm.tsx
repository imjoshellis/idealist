import React from 'react'

interface IdeaFormProps {}

export const IdeaForm: React.FC<IdeaFormProps> = () => {
  return (
    <div>
      <label htmlFor='idea' className='visuallyhidden'>
        idea
      </label>
      <input type='text' name='idea' id='idea' />
    </div>
  )
}

export default IdeaForm
