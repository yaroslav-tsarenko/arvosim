import { MongoClient, Db } from 'mongodb';

const uri = process.env.MONGODB_URI!;

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function getDb(): Promise<Db> {
  if (cachedDb) return cachedDb;

  const client = new MongoClient(uri);
  await client.connect();
  cachedClient = client;
  cachedDb = client.db();
  return cachedDb;
}

export async function getClient(): Promise<MongoClient> {
  if (cachedClient) return cachedClient;
  await getDb();
  return cachedClient!;
}
