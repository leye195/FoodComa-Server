import mongoose from "mongoose";
import FoodModel from "./models/FoodModel";
const u = "mongodb://localhost/foodcoma";

mongoose.connect(u, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error);
db.once("open", () => {
  console.log(`✨Connected to mongodb server ${u}`);
});

const foods = [
  {
    name: "노란상소갈비",
    type: ["한식", "고기"],
    address: "서울특별시 강남구 선릉로131길 22 1F",
    phone: "02-543-9290",
    imgUrl: [
      "https://mp-seoul-image-production-s3.mangoplate.com/405210/513273_1597239013238_9912",
      "https://mp-seoul-image-production-s3.mangoplate.com/405210/1100616_1596464384595_28148",
      "https://mp-seoul-image-production-s3.mangoplate.com/405210/244033_1596451523329_3785",
    ],
    latitude: "37.5174663",
    longitude: "127.0390282",
  },
  {
    name: "다운타우너(한남점)",
    type: ["양식", "햄버거"],
    address: "서울특별시 용산구 한남동 대사관로5길 12",
    phone: "07088203696",
    imgUrl: [
      "https://lh5.googleusercontent.com/p/AF1QipPWhpkSmUk_dK_ik85kcMt2ZKYsfzElXTnGLP5O=s387-k-no",
      "https://lh5.googleusercontent.com/p/AF1QipOBQENrBnCszvf8EmpJCS0Lcu4qoUwAXiCniWJg=w203-h152-k-no",
    ],
    latitude: "37.5348097",
    longitude: "127.0007239",
  },
  {
    name: "보니스피자펍",
    type: ["양식", "피자"],
    address: "서울특별시 용산구 용산동2가 44-19",
    phone: "02-792-0303",
    imgUrl: [
      "https://s3-ap-northeast-1.amazonaws.com/dcreviewsresized/pre_20200731081501_photo1_4uBLESlq4QwF.jpg",
      "https://s3-ap-northeast-1.amazonaws.com/dcreviewsresized/pre_20200731081507_menu2_4uBLESlq4QwF.jpg",
      "https://s3-ap-northeast-1.amazonaws.com/dcreviewsresized/pre_20200701123711724_photo_febb7f765559.jpg",
    ],
    latitude: "37.541206",
    longitude: "126.9867491",
  },
  {
    name: "우래옥",
    type: ["한식"],
    address: "서울특별시 중구 주교동 118-1",
    phone: "02-2265-0151",
    imgUrl: [
      "https://s3-ap-northeast-1.amazonaws.com/dcreviewsresized/20200728102657_photo1_NihewugpWHtQ.jpg",
      "https://s3-ap-northeast-1.amazonaws.com/dcreviewsresized/20200714093228_photo1_072855815289.jpg",
      "https://s3-ap-northeast-1.amazonaws.com/dcreviewsresized/20200416094617752_photo_b43ccd142415.jpg",
    ],
    latitude: "37.568191",
    longitude: "126.998698",
  },
];
//for (let i = 0; i < foods.length; i++) FoodModel.create(foods[i]);
/*FoodModel.create({
  name: "엘리스리틀이태리",
  type: ["양식"],
  address: "서울특별시 송파구 백제고분로41길 43-21 SANDONG빌딩",
  phone: "02-422-1210",
  imgUrl: [
    "https://mp-seoul-image-production-s3.mangoplate.com/added_restaurants/277947_1460717124430735.jpg",
    "https://mp-seoul-image-production-s3.mangoplate.com/1615007_1597043889286193.jpg",
  ],
  latitude: "37.508588",
  longitude: "127.104828",
});*/
