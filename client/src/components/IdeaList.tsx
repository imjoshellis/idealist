import React from 'react'
import { useIdeas } from '../providers/IdeaProvider'

interface IdeaListProps {}

export const IdeaList: React.FC<IdeaListProps> = () => {
  const [ideas] = useIdeas()
  return (
    <table
      data-testid='idea-list'
      className='table-auto text-lg my-2 rounded overflow-hidden '
    >
      <tbody>
        {ideas.map((idea, idx) => (
          <tr
            key={idx}
            className={`border-2 border-surface-600 ${
              idx % 2 ? 'bg-surface-800' : 'bg-surface-700'
            }`}
          >
            <td className='p-2'>{idx + 1}</td>
            <td className='p-2 w-full'>{idea}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default IdeaList
