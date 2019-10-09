const express = require("express");

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

const searchAd = async (req, res) => {
  try {
    const filterAd = await Product.find({
      _id: { $eq: req.query.id }
    });
    console.log(filterAd);
    return res.render("auth/order", { filterAd, id: filterAd[0]._id });
  } catch (err) {
    return res.render("order", { errorMessage: `Erro: ${err}!` });
  }
};

router.get("/auth/order", searchAd);

router.post("/auth/order", async (req, res, next) => {
  const filterAdSales = await Product.find({
    _id: { $eq: req.query.id }
  });

  const capBuyerId = req.session.currentUser;
  const filterBuyer = await User.find({
    _id: { $eq: capBuyerId._id }
  });

  console.log("Query", req.query);
  console.log("filterAdSales", filterAdSales[0]);
  console.log("capBuyerId", capBuyerId);

  if (filterBuyer._id === filterAdSales[0].userID)
    return res.render("order", {
      errorMessage: `Não é possivel negociar com você mesmo!`
    });

  req.body.buyerID = capBuyerId._id;
  req.body.salesID = filterAdSales[0].userID;
  req.body.productID = filterAdSales[0]._id;
  // console.log("BuyerID", req.body.buyerID);
  // console.log("SalesID", req.body.salesID);
  // console.log("productID", req.body.salesID);

  try {
    const orderCreate = await Order.create(req.body);
    // console.log("CreateOrder", req.body);
    const status = { status: "Em negociação" };
    await Product.findByIdAndUpdate(req.query.id, status);
    // console.log("Order", orderCreate);
    return res.redirect("/");
  } catch (err) {
    return res.render("order", {
      errorMessage: `Erro ao criar Negociação: ${err}`
    });
  }
});

router.post("/auth/orderEdit", async (req, res, next) => {
  const actions = req.body.actions;

  if (actions === "Produto Recebido") {
    const newStatus = { aproved: true };
  } else {
    newStatus = { aproved: false };
  }

  try {
    const orderEdited = await Order.findByIdAndUpdate(req.query.id, newStatus);
    return res.redirect("ads/auth/myAds");
  } catch (err) {
    return res.render("order", {
      errorMessage: `Erro ao editar Anuncio: ${err}`
    });
  }
});

module.exports = router;
