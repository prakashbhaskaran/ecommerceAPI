const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema({
  orderCustomerId: {
    type: String,
    required: true,
  },
  orderId: {
    type: Number,
    required: true,
  },
  orderProductID: {
    type: Number,
    required: true,
  },
  orderProductName: {
    type: String,
    required: true,
  },
  orderQuantity: {
    type: Number,
    required: true,
  },
  orderProductType: {
    type: String,
    required: true,
  },
  orderDate: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("order", OrderSchema);
