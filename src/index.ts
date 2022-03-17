import express, { Application, Request, Response } from "express";

import { ApolloServer } from "apollo-server-express";
import { resolvers, typeDefs } from "./graphql";

import { connectDatabase } from "./database";
import cookieParser from "cookie-parser";

const port = 9000;

const mount = async (app: Application) => {
  app.use(cookieParser(process.env.SECRET));
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: (req: Request, res: Response) => ({ db, req, res }),
  });
  const db = await connectDatabase();

  server.start().then((res) => {
    server.applyMiddleware({ app, path: "/api" });
    app.listen({ port }, () =>
      console.log(
        `server is up and running on port : ${port} ${process.env.G_CLIENT_ID}`
      )
    );
  });
};

mount(express());
