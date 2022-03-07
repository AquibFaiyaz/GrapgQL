import express, { Application } from "express";

import { ApolloServer } from "apollo-server-express";
import { resolvers, typeDefs } from "./graphql";

import { connectDatabase } from "./database";

const port = 9000;

const mount = async (app: Application) => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => ({ db }),
  });
  const db = await connectDatabase();

  server.start().then((res) => {
    server.applyMiddleware({ app, path: "/api" });
    app.listen({ port }, () =>
      console.log(`server is up and running on port : ${port}`)
    );
  });
};

mount(express());
