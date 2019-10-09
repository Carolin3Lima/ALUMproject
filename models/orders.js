const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  sellerID: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  productID: { type: Schema.Types.ObjectId, ref: "Event", required: true },
  // status: {
  //   type: String,
  //   enum: ["Disponivel", "Em negociação", "Vendido"],
  //   default: "Em negociação",
  //   required: true
  // },
  actions: {
    type: String,
    enum: ["Aguardando Envio", "Envio Efetuado", "Produto Recebido"],
    default: "Aguardando Envio"
  },
  aproved: { type: Boolean, default: false },
  buyerID: { type: Schema.Types.ObjectId, ref: "User" }
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
