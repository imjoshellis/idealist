import React from 'react'
import { useIdeas } from '../providers/IdeaProvider'

interface IdeaListProps {}

export const IdeaList: React.FC<IdeaListProps> = () => {
  const [ideas] = useIdeas()
  return (
    <div data-testid='idea-list'>
      {ideas.map((idea, idx) => (
        <div key={idx}>{idea}</div>
      ))}
    </div>
  )
}

export default IdeaList
