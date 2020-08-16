# FoodComa-Server (Express,Apollo-Server,MongoDB)

### ToDo

- Server Setting (Apollo-Server)
- Define graphql schema,resolvers
- connent mongoDB and Define models
- generate jwt token / check user

### Schema 정의(수정 중)

```
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

```
