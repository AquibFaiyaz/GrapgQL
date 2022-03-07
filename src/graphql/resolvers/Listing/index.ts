import { Database } from "../../../lib/types";
import { ObjectId } from "mongodb";
import { Listing } from "../../../lib/types";

export const listingResolver = {
  Query: {
    listings: async (
      _root: undefined,
      _args: Record<string, never>,
      { db }: { db: Database }
    ): Promise<Listing[]> => {
      return await db.listings.find({}).toArray();
    },
  },
  Mutation: {
    deleteListing: async (
      _root: undefined,
      { id }: { id: string },
      { db }: { db: Database }
    ): Promise<Listing> => {
      const deleteResult = await db.listings.findOneAndDelete({
        _id: new ObjectId(id),
      });
      if (!deleteResult.value) {
        throw new Error("Unable to delete");
      }
      return deleteResult.value;
    },

    deleteAll: async (
      _root: undefined,
      _args: Record<string, never>,
      { db }: { db: Database }
    ): Promise<string> => {
      try {
        await db.listings.deleteMany({});
        return "All listings deleted successfully!!";
      } catch (error) {
        throw new Error("Error deleting listings");
      }
    },
  },
  Listing: {
    id: (listing: Listing): string => listing._id.toString(),
  },
};
