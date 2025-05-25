import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
if (!uri) throw new Error("Please define the MONGODB_URI environment variable inside .env");

let client: MongoClient = new MongoClient(uri);
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  if (!(global as { _mongoClientPromise?: Promise<MongoClient> })._mongoClientPromise) {
    client = new MongoClient(uri);
    (global as { _mongoClientPromise?: Promise<MongoClient> })._mongoClientPromise = client.connect();
  }
  clientPromise = (global as { _mongoClientPromise?: Promise<MongoClient> })._mongoClientPromise || client.connect();
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export default clientPromise;