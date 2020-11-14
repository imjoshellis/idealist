import React from 'react'

interface ContainerProps {}

export const Container: React.FC<ContainerProps> = ({ children }) => {
  return <div data-testid='container'>{children}</div>
}

export default Container
