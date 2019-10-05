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
  // const myAds = await Product.find({title:/Camiseta/});
  try {
    res.render("auth/myAds", { myAds });
  } catch (err) {
    return res.render("error", {
      errorMessage: `Erro ao criar Anuncio: ${err}`
    });
  }
};

router.get("/auth/myAds", serchMyAds);

// router.get("/auth/myAds", function(req, res){
//   console.log(" asdasd")
//   var noMatch = null;
//   if(req.query.search) {
//       const regex = new RegExp(escapeRegex(req.query.search), 'gi');
//       // Get all Products from DB
//       Product.find({title: regex}, function(err, allProduct){
//          if(err){
//              console.log(err);
//          } else {
//             if(allProduct.length < 1) {
//                 noMatch = "No Product match that query, please try again.";
//             }
//             res.render("auth/myAds",{title:allProduct, noMatch: noMatch});
//          }
//       });
//   } else {
//       // Get all campgrounds from DB
//       Product.find({}, function(err, allProduct){
//          if(err){
//              console.log(err);
//          } else {
//           res.render("auth/myAds",{title:allProduct, noMatch: noMatch});         }
//       });
//   }
// });


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

function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

module.exports = router;
