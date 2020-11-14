import { AppProps } from 'next/dist/next-server/lib/router/router'
import React from 'react'
import { IdeaProvider } from '../providers/IdeaProvider'
import '../styles/globals.css'

function MyApp ({ Component, pageProps }: AppProps) {
  return (
    <IdeaProvider>
      <Component {...pageProps} />
    </IdeaProvider>
  )
}

export default MyApp
