const express = require("express");
const router = express.Router();
const userRouter = require("./user");
const accountRouter = require("./account");

router.get("/", function (req, res, next) {
  res.send("Router Working");
});

router.use("/user", userRouter);
router.use("/account", accountRouter);

module.exports = router;
