import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    food: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Food",
    },
    writer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    content: {
      type: String,
      required: "content is required",
    },
    rate: {
      type: Number,
      default: 0,
    },
    imgUrl: [
      {
        type: String,
        default: null,
      },
    ],
  },
  { timestamp: true }
);
const ReviewModel = mongoose.model("Review", reviewSchema);
export default ReviewModel;
