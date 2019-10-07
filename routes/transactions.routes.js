const express = require("express");

// const Order = require("../models/orders");
// const Product = require("../models/product");
// const User = require("../models/User");

// const router = express.Router();

// router.use((req, res, next) => {
//   if (req.session.currentUser) {
//     next();
//   } else {
//     res.redirect("/login");
//   }
// });

// router.get("/auth/", async (req, res, next) => {
// const userId = req.session.currentUser._id;
// const productIdArr = [];
// const productArr = [];

// const serchMyAds = async () => {
//   const myAds = await Product.find({ userID: { $eq: userId } });
// };

// const serchTransactions = async () => {
//   const myTransactions = await Order.find({ buyerID: { $eq: userId } });

//   myTransactions.forEach(element => {
//     productIdArr += element.productID;
//   });
// };

// const searchShopping = async () => {
//   productIdArr.forEach(async element => {
//     productArr += await Product.find({ _id: { $eq: element._id } });
//   });
// };

//   try {
//     res.render("auth/myAds", { myAds, product, myTransactions });
//   } catch (err) {
//     return res.render("error", {
//       errorMessage: `Erro ao criar Anuncio: ${err}`
//     });
//   }
// });

// module.exports = router;
