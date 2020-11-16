import { MongoClient, Db } from 'mongodb'
import { MongoMemoryServer } from 'mongodb-memory-server'

let mongo: MongoMemoryServer
let db: Db
let client: MongoClient

export const makeDb = async () => {
  mongo = new MongoMemoryServer()
  const MONGO_URI = await mongo.getUri()

  client = new MongoClient(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  await client.connect()
  db = db || client.db('test')
  return db
}

export async function closeDb () {
  await mongo.stop()
  await client.close()
}

export async function clearDb () {
  await db.collection('ideas').deleteMany({})
  return true
}

export { mongo, client, db }
