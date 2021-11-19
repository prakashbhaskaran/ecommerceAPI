const express = require("express");

const productDetails = require("../Schema/ProductSchema");

const customerDetails = require("../Schema/CustomerSchema");

const orderDetails = require("../Schema/OrderSchema");

const adminRouter = express.Router();

function isAdmin(req, res, next) {
  if (req.session.logged === true) {
    return next();
  } else {
    res.json({ stat: "unsuccessful" });
  }
}

//admin authentication
adminRouter.post("/login", (req, res) => {
  if (req.body.email === "admin@admin.admin" && req.body.password === "admin") {
    req.session.logged = true;
    req.session.save();
  }
  if (req.session.logged) {
    res.json({ message: "LoggedIn" });
  }
});

adminRouter.get("/logout", isAdmin, (req, res) => {
  req.session.destroy();
  res.json({ message: "Logged Out" });
});

//add accounts
adminRouter.post("/addaccount", isAdmin, (req, res) => {
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
      if (data) {
        res.json({ message: "success" });
      }
    })
    .then((err) => {
      if (err) {
        res.json({ message: "unsuccessful" });
      }
    });
});

//add products
adminRouter.post("/addproduct", isAdmin, (req, res) => {
  const product = new productDetails({
    productName: req.body.productName,
    Quantity: req.body.Quantity,
    productType: req.body.productType,
    date: Date(),
  });
  product
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

//vieworders
adminRouter.get("/orders", isAdmin, async (req, res) => {
  await orderDetails.find({}, (err, data) => {
    if (err) {
      res.json({ message: "unsuccessful" });
    } else {
      res.json(data);
    }
  });
});

module.exports = adminRouter;
