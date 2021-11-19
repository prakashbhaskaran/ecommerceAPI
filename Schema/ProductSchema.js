const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");
autoIncrement.initialize(mongoose.connection);
const ProductSchema = mongoose.Schema({
  productID: {
    type: Number,
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  Quantity: {
    type: Number,
    required: true,
  },
  productType: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
});

ProductSchema.plugin(autoIncrement.plugin, {
  model: "product",
  field: "productID",
  startAt: 1,
  incrementBy: 1,
});
module.exports = mongoose.model("product", ProductSchema);
