import { useIdeas, IdeaProvider } from '../../providers/IdeaProvider'
import * as React from 'react'
import { render, screen } from '@testing-library/react'

describe('IdeaProvider', () => {
  it('exposes ideas state getter and setter', async () => {
    const ideaArray = ['hi', 'world']
    const Component = () => {
      const [ideas, setIdeas] = useIdeas()
      React.useEffect(() => {
        setIdeas(ideaArray)
      }, [])

      return (
        <>
          {ideas.map((idea, idx) => (
            <div key={idx}>{idea}</div>
          ))}
        </>
      )
    }

    render(
      <IdeaProvider>
        <Component />
      </IdeaProvider>
    )
    for (let idea of ideaArray) {
      expect(await screen.findByText(idea)).toBeInTheDocument()
    }
  })
})
