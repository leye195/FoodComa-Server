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
    name: "육회자매집",
    type: ["한식", "고기", "육회"],
    address: "서울특별시 종로구 종로4가 177 1F",
    phone: "02-2272-3069",
    imgUrl: [
      "https://s3-ap-northeast-1.amazonaws.com/dcreviewsresized/20200714025902910_photo_26598b558c37.jpg",
      "https://s3-ap-northeast-1.amazonaws.com/dcreviewsresized/20200714025903463_photo_26598b558c37.jpg",
      "https://s3-ap-northeast-1.amazonaws.com/dcreviewsresized/20200616011054937_menu_700940d6db98.jpg",
      "https://s3-ap-northeast-1.amazonaws.com/dcreviewsresized/20200602052129295_photo_ace883d8fab5.jpg",
    ],
    latitude: "37.570529",
    longitude: "126.999870",
  },
  {
    name: "고기리 막국수",
    type: ["한식", "막국수", "고기"],
    address: "경기도 용인시 수지구 고기동 439-1",
    phone: "031-263-1107",
    imgUrl: [
      "https://s3-ap-northeast-1.amazonaws.com/dcreviewsresized/20200808221356_photo1_7cadc6174a28.jpg",
      "https://s3-ap-northeast-1.amazonaws.com/dcreviewsresized/20200801023152462_menu_LhoD9ZOQYpXn.jpg",
      "https://s3-ap-northeast-1.amazonaws.com/dcreviewsresized/20200808221356_photo2_7cadc6174a28.jpg",
    ],
    latitude: "37.360086",
    longitude: "127.040148",
  },
  {
    name: "진주집",
    type: ["한식", "칼국수", "국수", "면"],
    address: "서울특별시 영등포구 여의도동 36-2 여의도백화점 지하1층",
    phone: "02-780-6108",
    imgUrl: [
      "https://s3-ap-northeast-1.amazonaws.com/dcreviewsresized/20200812231221_photo1_26b151aebb34.jpg",
      "https://s3-ap-northeast-1.amazonaws.com/dcreviewsresized/20200812231221_photo9_26b151aebb34.jpg",
      "https://s3-ap-northeast-1.amazonaws.com/dcreviewsresized/20200812231221_photo8_26b151aebb34.jpg",
      "https://s3-ap-northeast-1.amazonaws.com/dcreviewsresized/20200812231225_menu1_26b151aebb34.jpg",
    ],
    latitude: "37.520749",
    longitude: "126.926946",
  },
  {
    name: "호야초밥",
    type: ["일식", "초밥", "회"],
    address: "서울특별시 광진구 화양동 12-36",
    phone: "02-461-3739",
    imgUrl: [
      "https://s3-ap-northeast-1.amazonaws.com/dcreviewsresized/20200707190147_photo1_pDYrK3WtOSXO.jpg",
      "https://s3-ap-northeast-1.amazonaws.com/dcreviewsresized/20200506121231_photo1_1df15554ef2a.jpg",
      "https://s3-ap-northeast-1.amazonaws.com/dcreviewsresized/20200707190152_menu1_pDYrK3WtOSXO.jpg",
      "https://s3-ap-northeast-1.amazonaws.com/dcreviewsresized/20191231124836_photo1_4uBLESlq4QwF.jpg",
    ],
    latitude: "37.543600",
    longitude: "127.070442",
  },
  {
    name: "스시로로",
    type: ["일식", "초밥"],
    address: "서울특별시 동작구 사당동 1006-5",
    phone: "02-585-1015",
    imgUrl: [
      "https://s3-ap-northeast-1.amazonaws.com/dcreviewsresized/20200414092356_photo1_6010310fd5ba.jpg",
      "https://s3-ap-northeast-1.amazonaws.com/dcreviewsresized/20200417192348_photo1_9dLu0XN8Lk1g.jpg",
      "https://s3-ap-northeast-1.amazonaws.com/dcreviewsresized/20200316014618_menu1_60808c28d8b8.jpg",
    ],
    latitude: "37.484108",
    longitude: "126.980098",
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
