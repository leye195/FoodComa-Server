import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import moment from "moment";

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    trim: true,
    unique: 1,
  },
  password: {
    type: String,
    minlength: 5,
  },
  image: {
    type: String,
  },
  authType: {
    type: String,
  },
  like: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Food",
    },
  ],
});

userSchema.statics.getUser = async function (authorization, secret) {
  const user = this;
  const bearLength = `Bearer `.length;
  if (authorization && authorization.length > bearLength) {
    const token = authorization.slice(bearLength);
    const { ok, result } = await new Promise((resolve) => {
      jwt.verify(token, secret, (err, result) => {
        if (err) {
          resolve({
            ok: false,
            result: err,
          });
        } else {
          resolve({
            ok: true,
            result,
          });
        }
      });
    });
    if (ok) {
      const userObj = await user.findOne({ _id: result });
      return userObj;
    } else {
      return null;
    }
  }
  return null;
};

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
