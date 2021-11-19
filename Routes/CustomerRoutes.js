const express = require("express");

const customerDetails = require("../Schema/CustomerSchema");

const productDetails = require("../Schema/ProductSchema");

const orderDetails = require("../Schema/OrderSchema");

const customerRouter = express.Router();

//Add account
customerRouter.post("/signup", (req, res) => {
  const customer = new customerDetails({
    customerId: req.body.username.replace(/(..)/g, "$11000"),
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    date: Date(),
  });
  customer
    .save()
    .then((data) => {
      if (data.length !== 0) {
        res.json({ message: "success" });
      }
    })
    .then((err) => {
      if (err) {
        res.json({ message: "unsuccessful" });
      }
    });
});

//Login
customerRouter.post("/signin", async (req, res) => {
  try {
    const customer = await customerDetails.findOne({
      email: req.body.email,
      password: req.body.password,
    });
    res.json({
      email: customer.email,
      customerId: customer.customerId,
      username: customer.username,
    });
  } catch (err) {
    res.json({ message: "Wrong email or password" });
  }
});

//Browse Products
customerRouter.get("/products", async (req, res) => {
  await productDetails.find({}, (err, data) => {
    if (err) {
      res.json({ message: "success" });
    } else {
      res.json(data);
    }
  });
});

customerRouter.get("/product/:productID", async (req, res) => {
  try {
    const product = await productDetails.findOne({
      productID: req.params.productID,
    });
    res.json(product);
  } catch (err) {
    res.json({ message: "unsuccessful" });
  }
});

//Order products
customerRouter.post("/order", (req, res) => {
  const order = new orderDetails({
    orderCustomerId: req.body.customerId,
    orderId: Date.now(),
    orderProductID: req.body.orderProductID,
    orderProductName: req.body.orderProductName,
    orderQuantity: req.body.orderQuantity,
    orderProductType: req.body.orderProductType,
    orderDate: Date(),
  });
  order
    .save()
    .then((data) => {
      if (data.length !== 0) {
        res.json({ message: "success" });
      }
    })
    .then((err) => {
      if (err) {
        res.json({ message: "unsuccessful" });
      }
    });
});

//View Orders
customerRouter.post("/orders", async (req, res) => {
  await orderDetails.find(
    { orderCustomerId: req.body.customerId },
    (err, data) => {
      if (err) {
        res.json({ message: "unsuccessful" });
      } else {
        res.json(data);
      }
    }
  );
});

module.exports = customerRouter;
