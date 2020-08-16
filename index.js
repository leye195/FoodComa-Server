import express from "express";
import { ApolloServer } from "apollo-server-express";
import typeDefinitions from "./graphql/schema";
import resolvers from "./graphql/resolvers";
import FoodModel from "./models/FoodModel";
import ReviewModel from "./models/ReviewModel";
import CategoryModel from "./models/CategoryModel";
import UserModel from "./models/UserModel";
import dotenv from "dotenv";
import "./db";
dotenv.config();
const secret = process.env.JWT_SECRET;
const app = express();
//app.use(cors());

const server = new ApolloServer({
  typeDefs: typeDefinitions,
  resolvers,
  context: ({ req: { headers } }) => ({
    FoodModel,
    ReviewModel,
    CategoryModel,
    UserModel,
    secret,
    headers,
  }),
});
server.applyMiddleware({ app, path: "/graphql" });
app.listen(process.env.PORT || 4040, () => {
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
});
