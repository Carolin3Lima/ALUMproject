const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  salesID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  productID: { type: Schema.Types.ObjectId, ref: "Event", required: true },
  status: {
    type: String,
    enum: ["Diponivel", "Em negociação", "Vendido"],
    default: "Disponivel",
    required: true
  },
  actions: {
    type: String,
    enum: ["waiting-sent", "sent", "received"],
    default: "waiting-sent"
  },
  aproved: { type: Boolean, default: false },
  buyerID: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
