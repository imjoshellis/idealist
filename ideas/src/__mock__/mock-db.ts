import { MongoClient, Db } from 'mongodb'
import { MongoMemoryServer } from 'mongodb-memory-server'

let mongo: MongoMemoryServer
let db: Db
let client: MongoClient

export const makeDb = async (): Promise<any> => {
  mongo = new MongoMemoryServer()
  const MONGO_URI = await mongo.getUri()

  client = new MongoClient(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  await client.connect()
  db = client.db('test')
  return db
}

export async function closeDb (): Promise<void> {
  await mongo.stop()
  await client.close()
}

export async function clearDb (): Promise<boolean> {
  await db.collection('ideas').deleteMany({})
  return true
}

export { mongo, client, db }
