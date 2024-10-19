import { Db, MongoClient } from 'mongodb'

let mongoClient: MongoClient | null = null
let db: Db | null = null

export async function getMongoDb(): Promise<Db> {
  if (!db) {
    if (!mongoClient) {
      mongoClient = new MongoClient(process.env.MONGODB_URI!)
      await mongoClient.connect()
    }
    db = mongoClient.db(process.env.MONGODB_NAME!)
  }
  return db
}
