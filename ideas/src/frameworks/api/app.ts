import { json } from 'body-parser'
import cookieSession from 'cookie-session'
import express from 'express'

const app = express()
app.set('trust proxy', true)
app.use(json())

app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test'
  })
)

app.all('*', () => {
  throw new Error()
})

export { app }
