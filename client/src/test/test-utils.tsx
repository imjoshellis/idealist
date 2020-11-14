import * as React from 'react'
import { render as rtlRender } from '@testing-library/react'
import { IdeaProvider } from '../providers/IdeaProvider'

const render = (
  ui: React.ReactElement,
  { ideas = [] as string[], ...options } = {}
) => {
  const Wrapper: React.FunctionComponent = ({ children }) => (
    <IdeaProvider initialIdeas={ideas}>{children}</IdeaProvider>
  )
  return rtlRender(ui, { wrapper: Wrapper, ...options })
}

export * from '@testing-library/react'
// override React Testing Library's render with our own
export { render }
