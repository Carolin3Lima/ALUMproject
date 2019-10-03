const express = require("express");
const uploadCloud = require("../public/images/cloudinary/cloudinary");
const Product = require("../models/product");
const router = express.Router();

router.use((req, res, next) => {
  if (req.session.currentUser) {
    next();
  } else {
    res.redirect("/login");
  }
});

const serchMyAds = async (req, res) => {
  const userId = req.session.currentUser._id;
  const myAds = await Product.find({ userID: { $eq: userId } });
  try {
    res.render("auth/myAds", { myAds });
  } catch (err) {
    return res.render("error", {
      errorMessage: `Erro ao criar Anuncio: ${err}`
    });
  }
};

router.get("/auth/myAds", serchMyAds);

router.post(
  "/auth/myAds",
  uploadCloud.single("photo"),
  async (req, res, next) => {
    const { title, school } = req.body;

    if (!title || !school)
      return res.render("error", { errorMessage: `Dados insuficientes!` });

    req.body.userID = req.session.currentUser._id;
    req.body.imgPath = req.file.url;
    req.body.imgName = req.file.originalname;

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
    const adsEdited = await Product.findByIdAndUpdate(req.body._id, req.body);
    return res.redirect("/ads/auth/myAds");
  } catch (err) {
    return res.render("error", {
      errorMessage: `Erro ao editar Anuncio: ${err}`
    });
  }
});

module.exports = router;
