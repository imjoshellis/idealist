import React from 'react'
import { useIdeas } from '../providers/IdeaProvider'

interface IdeaCounterProps {}

export const IdeaCounter: React.FC<IdeaCounterProps> = () => {
  const [ideas] = useIdeas()
  return <span data-testid='idea-counter'>{ideas.length}</span>
}

export default IdeaCounter
