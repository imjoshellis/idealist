import React from 'react'

interface ContainerProps {
  maxWidth?: 'none' | 'sm' | 'md' | 'lg'
}

export const Container: React.FC<ContainerProps> = ({
  children,
  maxWidth = 'none'
}) => {
  return (
    <div
      data-testid='container'
      className='flex justify-center items-center h-screen w-screen px-4 md: px-8 lg:px-24'
    >
      <div className={`w-full max-w-${maxWidth}`}>{children}</div>
      <div className='max-w-sm max-w-none max-w-lg max-w-md'></div>
    </div>
  )
}

export default Container
