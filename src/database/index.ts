import "dotenv/config";
import { MongoClient } from "mongodb";
import { Database } from "../lib/types";

const url = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@${process.env.CLUSTER}.tohzs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

export const connectDatabase = async (): Promise<Database> => {
  const client = await MongoClient.connect(url);

  const db = client.db("main");

  return {
    listings: db.collection("test_listings"),
  };
};
