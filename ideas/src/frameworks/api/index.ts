import { app } from './app'
import { MongoClient } from 'mongodb'

export const start = async (): Promise<void> => {
  console.log('Starting Ideas Service: /api/ideas')
  const { JWT_KEY, MONGO_URI } = process.env

  if (JWT_KEY === undefined) throw new Error('JWT_KEY must be defined')
  if (MONGO_URI === undefined) throw new Error('MONGO_URI must be defined')

  const client = new MongoClient(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  try {
    await client.connect()
    console.log('Connected to MongoDB')
  } catch (err) {
    console.error(err)
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close()
  }

  const PORT = 3000
  app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`)
  })
}
