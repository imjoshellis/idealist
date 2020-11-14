import React from 'react'

interface ContainerProps {}

export const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div
      data-testid='container'
      className='flex justify-center items-center h-screen w-screen'
    >
      <div className=''>{children}</div>
    </div>
  )
}

export default Container
