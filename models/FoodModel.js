import mongoose from "mongoose";

const foodSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      default: "",
    },
    rate: {
      type: Array,
      default: [],
    },
    phone: {
      type: String,
    },
    imgUrl: {
      type: Array,
      default: [],
    },
    type: {
      type: Array,
      default: ["기타"],
    },
    latitude: {
      type: String,
      default: "",
    },
    longitude: {
      type: String,
      default: "",
    },
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
    like: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamp: true }
);
foodSchema.virtual("avg_rate").get(function () {
  const food = this;
  let total = 0,
    rates = food.rate;
  if (rates.length > 0) {
    for (let i = 0; i < rates.length; i++) total += rates[i];
    total = total / rates.length;
    return total;
  }
  return 0;
});

foodSchema.statics.findFoodsByType = function (typeName, cb) {
  const food = this;
  if (typeName !== "all") {
    return food.find({ type: { $all: [typeName] } });
  } else {
    return food.find({});
  }
};

foodSchema.statics.checkLikedOrNot = function ({ uid, fid }, cb) {
  const food = this.findOne({ _id: fid, like: { $in: [uid] } });
  if (food) return true;
  else return false;
};

const FoodModel = mongoose.model("Food", foodSchema);
export default FoodModel;
