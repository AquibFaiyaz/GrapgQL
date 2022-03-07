import "dotenv/config";
import { MongoClient } from "mongodb";
import { Database } from "../lib/types";

const user = process.env.USER;
const userPassword = process.env.PASSWORD;
const cluster = process.env.CLUSTER;

const url = `mongodb+srv://${user}:${userPassword}@${cluster}.tohzs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

export const connectDatabase = async (): Promise<Database> => {
  const client = await MongoClient.connect(url);

  const db = client.db("main");
  console.log(process.env);
  return {
    listings: db.collection("test_listings"),
  };
};
