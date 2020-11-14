import React, { useState } from 'react'

interface SaveListProps {}

export const SaveList: React.FC<SaveListProps> = () => {
  const [download, setDownload] = useState(false)
  const createFile = () => {
    setDownload(true)
  }
  return (
    <div data-testid='save-list'>
      {download ? (
        <button>download</button>
      ) : (
        <button onClick={createFile}>save</button>
      )}
    </div>
  )
}

export default SaveList
