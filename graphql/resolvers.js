import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const resolvers = {
  Query: {
    foods: (_, { type }, { FoodModel }) => {
      const foods = FoodModel.findFoodsByType(type);
      return foods || [];
    },
    categories: (_, __, { CategoryModel }) => {
      const category = CategoryModel.find();
      return category;
    },
    food: (_, { id }, { FoodModel }) => {
      const food = FoodModel.findOne({ _id: id }).populate("reviews");
      return food;
    },
    currentUser: (_, __, { UserModel, headers, secret }) => {
      const user = UserModel.getUser(headers["authorization"], secret);
      return user;
    },
    userReviews: (_, { uid }, { ReviewModel }) => {
      const reviews = ReviewModel.find({ writer: uid });
      console.log(uid);
      return reviews;
    },
    like: (_, { uid }, { FoodModel }) => {
      const foods = FoodModel.find({ like: { $in: [uid] } });
      return foods;
    },
  },
  Mutation: {
    signUp: async (_, { email, password }, { UserModel, secret }) => {
      const saltRound = 10;
      const salt = await bcrypt.genSalt(saltRound);
      const pw = await bcrypt.hash(password, salt);
      try {
        const user = await UserModel.create({ email, password: pw });
        const token = jwt.sign({ _id: user._id }, secret);
        user.token = token;
        return { success: true, user };
      } catch (e) {
        return { success: false, user: null };
      }
    },
    signInEmail: async (_, { email, password }, { UserModel, secret }) => {
      const user = await UserModel.findOne({ email });
      if (user) {
        const compare = await bcrypt.compare(password, user.password);
        if (compare) {
          const token = jwt.sign({ _id: user._id }, secret);
          user.token = token;
          return {
            success: true,
            user,
          };
        } else
          return {
            success: false,
            user: null,
          };
      } else {
        return {
          success: false,
          user: null,
        };
      }
    },
    logOut: () => {},
    submitReview: async (_, { uid, fid, content, rate }, { ReviewModel }) => {
      //const review = ReviewModel.create({})
    },
    likeFood: async (_, { uid, fid }, { FoodModel }) => {
      const liked = await FoodModel.checkLikedOrNot({ uid, fid });
      if (!liked) {
        const food = await FoodModel.findOneAndUpdate(
          { _id: fid },
          { $push: { like: uid } },
          { new: true }
        );
        if (food) return true;
        return false;
      } else {
        return false;
      }
    },
  },
};
export default resolvers;
