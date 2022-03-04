import {
  GraphQLID,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLSchema,
  GraphQLNonNull,
} from "graphql";
import { listings } from "./listings";

listings;

const Listing = new GraphQLObjectType({
  name: "Listing",
  fields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    title: { type: new GraphQLNonNull(GraphQLString) },
    image: { type: new GraphQLNonNull(GraphQLString) },
    address: { type: new GraphQLNonNull(GraphQLString) },
    price: { type: new GraphQLNonNull(GraphQLInt) },
    numOfGuests: { type: new GraphQLNonNull(GraphQLInt) },
    numOfBeds: { type: new GraphQLNonNull(GraphQLInt) },
    numOfBaths: { type: new GraphQLNonNull(GraphQLInt) },
    rating: { type: new GraphQLNonNull(GraphQLInt) },
  },
});

const query = new GraphQLObjectType({
  name: "Query",
  fields: {
    listings: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(Listing))),
      resolve: () => listings,
    },
  },
});
const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    hello: {
      type: new GraphQLNonNull(Listing),
      resolve: () => "Hello from mutation",
    },
  },
});

export const schema = new GraphQLSchema({ query, mutation });
