const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { authMiddleware } = require("../middleware");
const { Account } = require("../db");
const router = express.Router();

router.get("/balance", authMiddleware, async (req, res) => {
  try {
    const { userId } = req;
    const account = await Account.findOne({ userId });

    res.status(200).json({ balance: account.balance });
  } catch (error) {
    res.status(404).json({ message: "something went wrong" });
  }
});

router.post("/transfer", authMiddleware, async (req, res) => {
  // start transaction
  const session = await mongoose.startSession();
  session.startTransaction();

  const { to, amount } = req.body;
  const { userId } = req;
  const account = Account.findOne({ userId }).session(session);
  const { balance } = account;
  if (!account || balance < amount) {
    await session.abortTransaction();
    res.status(400).json({ error: "Insufficient balance" });
  }

  const toAccount = await Account.findOne({
    userId: to,
  }).session(session);

  if (!toAccount) {
    await session.abortTransaction();
    return res.status(400).json({
      message: "Invalid account",
    });
  }

  await Account.updateOne(
    { userId },
    {
      $inc: {
        balance: -amount,
      },
    }
  ).session(session);
  await Account.updateOne(
    { userId: to },
    {
      $inc: {
        balance: amount,
      },
    }
  ).session(session);
  // Commit the transaction
  await session.commitTransaction();
  res.json({
    message: "Transfer successful",
  });
});

module.exports = router;
