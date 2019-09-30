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

router.get("/auth/myAds", (req, res, next) => {
  return res.render("auth/myAds");
});

router.post(
  "/auth/myAds",
  uploadCloud.single("photo"),
  async (req, res, next) => {
    const { title, school } = req.body;

    if (!title || !school)
      return res.render("error", { errorMessage: `Dados insuficinetes!` });

    const imgPath = req.file.url;
    const imgName = req.file.originalname;
    req.body.userID = req.session.currentUser._id;
    req.body.imgPath = imgPath;
    req.body.imgName = imgName;
    const newImage = { imgPath, imgName };

    try {
      const adsCreate = await Product.create(req.body);
      adsCreate.save();
      return res.redirect("/");
    } catch (err) {
      return res.render("error", {
        errorMessage: `Erro ao criar Anuncio: ${err}`
      });
    }
  }
);

module.exports = router;
