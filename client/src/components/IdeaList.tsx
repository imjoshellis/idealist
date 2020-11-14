import React from 'react'
import { useIdeas } from '../providers/IdeaProvider'

interface IdeaListProps {}

export const IdeaList: React.FC<IdeaListProps> = () => {
  const [ideas] = useIdeas()
  return (
    <div data-testid='idea-list' className='flex flex-col text-lg'>
      {ideas.map((idea, idx) => (
        <div className='mb-2' key={idx}>
          {idea}
        </div>
      ))}
    </div>
  )
}

export default IdeaList