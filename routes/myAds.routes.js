const express = require("express");
const uploadCloud = require("../public/images/cloudinary/cloudinary");

const Order = require("../models/orders");
const Product = require("../models/product");
const User = require("../models/User");

const router = express.Router();

router.use((req, res, next) => {
  if (req.session.currentUser) {
    next();
  } else {
    res.redirect("/login");
  }
});

let userId = "";
let myAds = "";
let myTransactions = "";
let productIdArr = [];
let productArr = [];
let buyer = "";

const searchMyAds = async () => {
  myAds = await Product.find({ userID: { $eq: userId } });
};

const serchTransactions = async () => {
  myTransactions = await Order.find({ buyerID: { $eq: userId } });

  myTransactions.forEach(element => {
    productIdArr.push(element.productID);
  });
};

const searchShopping = async () => {
  for (const key of productIdArr) {
    let oneProduct = await Product.findOne({ _id: { $eq: key } });
    productArr.push(oneProduct);
  }
};

const searchBuyer = async () => {
  buyer = await User.findOne({ _id: { $eq: buyerID } });
  buyer.password = undefined;
};

router.get("/auth/myAds", async (req, res, next) => {
  userId = req.session.currentUser._id;
  await searchMyAds();
  await serchTransactions();
  await searchShopping();
  try {
    console.log("myAds", myAds);
    console.log("ProductArr", productArr);
    console.log("myTransactions", myTransactions);
    return res.render("auth/myAds", {
      myAds,
      productArr,
      myTransactions,
      buyer
    });
  } catch (err) {
    return res.render("error", {
      errorMessage: `Erro ao criar Negociação: ${err}`
    });
  }
});

router.post(
  "/auth/myAds",
  uploadCloud.single("photo"),
  async (req, res, next) => {
    const { title, school } = req.body;

    if (!title || !school)
      return res.render("error", { errorMessage: `Dados insuficientes!` });

    req.body.userID = req.session.currentUser._id;
    req.body.imgPath = req.file.url ? req.file.url : "";
    req.body.imgName = req.file.originalname ? req.file.originalname : "";

    try {
      const adsCreate = await Product.create(req.body);
      adsCreate.save();
      return res.redirect("/");
    } catch (err) {
      console.log("err", err);
      return res.render("error", {
        errorMessage: `Erro ao criar Anuncio: ${err}`
      });
    }
  }
);

router.get("/auth/myAdsEdit/:myAdsEditId", async (req, res, next) => {
  const ads = await Product.findById(req.params.myAdsEditId);
  return res.render("auth/myAdsEdit", ads);
});

router.post("/auth/myAdsEdit", async (req, res, next) => {
  try {
    const adsEdited = await Product.findByIdAndUpdate(req.query.id, req.body);
    return res.redirect("/ads/auth/myAds");
  } catch (err) {
    return res.render("error", {
      errorMessage: `Erro ao editar Anuncio: ${err}`
    });
  }
});

router.get("/auth/myAdsDel/:myAdsDelId", async (req, res, next) => {
  const ads = await Product.findById(req.params.myAdsDelId);
  return res.render("auth/myAdsDel", ads);
});

router.post("/auth/myAdsDel", async (req, res, next) => {
  console.log(req.query);
  try {
    const adsDeleted = await Product.findByIdAndDelete(req.query.id, req.body);
    return res.redirect("/ads/auth/myAds");
  } catch (err) {
    return res.render("error", {
      errorMessage: `Erro ao editar Anuncio: ${err}`
    });
  }
});

function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

module.exports = router;
