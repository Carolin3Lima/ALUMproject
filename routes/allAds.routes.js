const express = require("express");
const uploadCloud = require("../public/images/cloudinary/cloudinary");
const Product = require("../models/product");
const router = express.Router();


//ENFIA NO CU ESSA VALIDACAO DE LOGIN
// router.use((req, res, next) => {
//   if (req.session.currentUser) {
//     next();
//   } else {
//     res.redirect("/login");
//   }
// });


const serchAllAds = async (req, res) => {
  const regex = new RegExp(escapeRegex(req.query.search), 'gi');
  const allAds = await Product.find({title:regex});
    res.render("auth/allAds", { allAds });
};

router.get("/auth/allAds", serchAllAds);

function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

module.exports = router;
