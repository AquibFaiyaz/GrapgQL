import { listings } from "../listings";

export const resolvers = {
  Query: {
    listings: () => listings,
  },
  Mutation: {
    deleteListing: (_root: undefined, { id }: { id: string }) => {
      const [filteredData] = listings.filter((item) => item.id === id);
      if (filteredData) {
        return filteredData;
      }
      throw new Error("failed to delete listing");
    },
  },
};
