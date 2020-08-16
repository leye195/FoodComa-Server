import { gql } from "apollo-server-express";
const typeDefinitions = gql`
  type Food {
    _id: String
    name: String
    address: String
    rate: [Int]
    imgUrl: [String]
    type: [String]
    latitude: String
    longitude: String
    reviews: [Review]
    avg_rate: Float
    like: [User]
  }
  type Review {
    _id: String
    writer: User!
    content: String
    rate: Float
  }
  type User {
    _id: String
    name: String
    email: String
    image: String
    password: String
    token: String
  }
  type Category {
    _id: String
    name: String
  }
  type SignResponse {
    success: Boolean!
    user: User!
  }

  type Query {
    currentUser: User
    foods(type: String!): [Food]
    food(id: ID!): Food
    categories: [Category]
    userReviews(uid: ID!): [Review]
    like(uid: ID!): [Food]
  }
  type Mutation {
    signUp(email: String!, password: String!): SignResponse!
    signInEmail(email: String!, password: String!): SignResponse!
    logOut: Boolean!
    submitReview(uid: ID!, fid: ID!, content: String!, rate: Float!): Boolean!
    likeFood(uid: ID!, fid: ID!): Boolean!
  }
`;

export default typeDefinitions;
