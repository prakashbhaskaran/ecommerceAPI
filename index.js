const express = require("express");

const dotenv = require("dotenv");

const mongoose = require("mongoose");

const cors = require("cors");

const customerRouter = require("./Routes/CustomerRoutes");

const adminRouter = require("./Routes/AdminRoutes");

const session = require("express-session");

dotenv.config({ path: "./config.env" });

const app = express();

app.use(cors());

app.use(express.json());

app.use(
  session({
    secret: "admin",
    resave: false,
    saveUninitialized: false,
  })
);

app.use("/", customerRouter);

app.use("/admin", adminRouter);

mongoose.connect(
  `${process.env.MONGO_URI}`,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected");
  }
);

app.listen(process.env.PORT || 8000);
