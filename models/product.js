const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: { type: String, required: true, min: 5, max: 30 },
  school: { type: String, required: true, min: 5, max: 50 },
  photo: { type: String, min: 5, max: 30 },
  description: { type: String, required: true, min: 5, max: 120 },
  value: { type: Number, min: 1, max: 5 },
  product: {
    type: String,
    enum: ["Uniforme", "Livros", "Outros"]
  },
  uniforme: {
    type: String,
    enum: ["Bermuda/Saia", "Calça", "Casaco/Blusa", "Camiseta", "Outros"]
  },
  tagAno: {
    type: String,
    enum: [
      "",
      "1 ano",
      "2 ano",
      "3 ano",
      "4 ano",
      "5 ano",
      "6 ano",
      "7 ano",
      "8 ano",
      "9 ano",
      "1 ano Medio",
      "2 ano Medio",
      "3 ano Medio"
    ]
  },
  tagMatter: {
    type: String,
    enum: [
      "",
      "Geografia",
      "Matemática",
      "Português",
      "Ciências",
      "História",
      "Iglês",
      "Outros"
    ]
  },
  tagSize: { type: String, enum: ["", "P", "M", "G"] },
  tagState: { type: String, enum: ["", "Novo", "Usado"] },
  userID: { type: Schema.Types.ObjectId, ref: "Event" }
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
