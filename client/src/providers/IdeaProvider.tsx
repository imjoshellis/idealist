import * as React from 'react'

const IdeaContext = React.createContext<
  [string[], React.Dispatch<React.SetStateAction<string[]>>] | null
>(null)

function useIdeas () {
  const context = React.useContext(IdeaContext)
  if (!context) {
    throw new Error('useIdeas should be used within a IdeaProvider')
  }
  return context
}

function IdeaProvider ({ initialIdeas = [] as string[], ...props }) {
  const [ideas, setIdeas] = React.useState(initialIdeas)
  return <IdeaContext.Provider value={[ideas, setIdeas]} {...props} />
}

export { useIdeas, IdeaProvider }
