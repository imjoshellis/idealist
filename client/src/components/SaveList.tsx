import React, { useEffect, useState } from 'react'
import { useIdeas } from '../providers/IdeaProvider'

interface SaveListProps {}

export const SaveList: React.FC<SaveListProps> = () => {
  const [downloadLink, setDownloadLink] = useState('')
  const [ideas] = useIdeas()

  const makeTextFile = () => {
    var data = new Blob([ideas.join('\n')], { type: 'text/plain' })

    if (downloadLink !== '') {
      window.URL.revokeObjectURL(downloadLink)
    }

    setDownloadLink(window.URL.createObjectURL(data))
  }

  useEffect(() => {
    makeTextFile()
  }, [ideas])

  return (
    <a
      data-testid='save-list'
      download='list.txt'
      className='text-success-100 text-center w-full px-8 py-4 mt-2 rounded uppercase font-bold bg-success-500'
      href={downloadLink}
    >
      save
    </a>
  )
}

export default SaveList
