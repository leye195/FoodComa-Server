import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PubSub } from "apollo-server";

export const pubsub = new PubSub();

const resolvers = {
  Query: {
    foods: async (_, { type }, { FoodModel }) => {
      const foods = await FoodModel.findFoodsByType(type);
      return foods || [];
    },
    categories: async (_, __, { CategoryModel }) => {
      const category = await CategoryModel.find();
      return category;
    },
    food: async (_, { id }, { FoodModel }) => {
      const food = await FoodModel.findOne({ _id: id }).populate({
        path: "reviews",
        populate: { path: "writer" },
      });
      //console.log(food);
      return food;
    },
    currentUser: (_, __, { UserModel, headers, secret }) => {
      const user = UserModel.getUser(headers["authorization"], secret);
      return user;
    },
    userReviews: async (_, { uid }, { ReviewModel }) => {
      const reviews = await ReviewModel.find({ writer: uid })
        .populate("writer")
        .populate("food");
      console.log(reviews);
      return reviews;
    },
    like: (_, { uid }, { FoodModel }) => {
      const foods = FoodModel.find({ like: { $in: [uid] } });
      return foods;
    },
    searchFood: async (_, { keyword }, { FoodModel }) => {
      const foods = await FoodModel.find({
        $or: [
          { name: { $regex: keyword, $options: "i" } },
          { type: { $in: [keyword] } },
        ],
      });
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
    submitReview: async (
      _,
      { uid, fid, content, rate },
      { ReviewModel, FoodModel }
    ) => {
      //console.log(uid, fid, content, rate);
      const review = await ReviewModel.create({
        writer: uid,
        content,
        rate,
        food: fid,
      });
      const food = await FoodModel.findOneAndUpdate(
        { _id: fid },
        { $push: { reviews: review._id, rate } },
        { new: true }
      );
      if (food) return true;
      return false;
    },
    updateReview: async (_, { fid, content }, { ReviewModel }) => {
      const review = await ReviewModel.findOneAndUpdate(
        { fid },
        { $set: { content } },
        { new: true }
      );
      if (review) return true;
      return false;
    },
    deleteReview: async (_, { fid }, { ReviewModel }) => {
      const review = await ReviewModel.findOneAndDelete({ fid }, { new: true });
      if (review) return true;
      return false;
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
      } else {
        const food = await FoodModel.findOneAndUpdate(
          { _id: fid },
          { $pull: { like: { $in: [uid] } } },
          { new: true }
        );
        if (food) return false;
      }
    },
    uploadProfileImage: async (_, { id, file }, { UserModel }) => {
      if (file.length > 0) {
        const user = await UserModel.findOneAndUpdate(
          { _id: id },
          { $set: { image: file } },
          { new: true }
        );
        if (user) return true;
        return false;
      } else {
        return false;
      }
    },
  },
};

export default resolvers;
