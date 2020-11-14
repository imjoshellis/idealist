import React from 'react'
import { useIdeas } from '../providers/IdeaProvider'

interface IdeaCounterProps {
  goal?: number
}

export const IdeaCounter: React.FC<IdeaCounterProps> = ({ goal = 10 }) => {
  const [ideas] = useIdeas()
  const count = ideas.length
  const getString = () => {
    if (count === 0) return 'Add an idea to get started'
    const baseString = `Added ${count}/${goal} idea${count === 1 ? '' : 's'}`
    if (count >= goal * 5) return `${baseString} 🦄️`
    if (count >= goal * 2) return `${baseString} 🔥️`
    if (count >= goal) return `${baseString} 🎉️`
    if (count >= goal / 2) return `${baseString} 👀️`
    return `${baseString} ✍️`
  }
  return (
    <span data-testid='idea-counter' className='text-3xl'>
      {getString()}
    </span>
  )
}

export default IdeaCounter
