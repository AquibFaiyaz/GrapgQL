import "dotenv/config";
import { connectDatabase } from "../src/database";

const clear = async () => {
  try {
    const db = await connectDatabase();

    const bookings = await db.bookings.find({}).toArray();
    const listings = await db.listings.find({}).toArray();
    const users = await db.users.find({}).toArray();

    bookings.length > 0 && (await db.bookings.drop());
    listings.length > 0 && (await db.listings.drop());
    users.length > 0 && (await db.users.drop());

    console.log("Db cleared successfully...");
  } catch {
    throw new Error("Error clearing data....");
  }
};

clear();
