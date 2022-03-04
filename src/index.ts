import express from "express";
import { ApolloServer } from "apollo-server-express";
import { schema } from "./graphql";

const port = 9000;

const server = new ApolloServer({ schema });
const app = express();

server.start().then((res) => {
  server.applyMiddleware({ app, path: "/api" });
  app.listen({ port }, () =>
    console.log(`server is up and running on port : ${port}`)
  );
});
