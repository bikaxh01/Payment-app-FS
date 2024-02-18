const { authMiddleware } = require("../middleware");
const express = require("express");
const { Account, user } = require("../Database/userDB");
const mongoose = require("mongoose");
const zod = require("zod");

const router = express.Router();

router.get("/balance", authMiddleware, async (req, res) => {
  // Balance route

  const userID = req.userId; // getting user ID from req

  const userBalance = await Account.findOne({
    // geting user detail using ID
    userId: userID,
  });

  console.log(userBalance);
  res.json({
    Current_balance: userBalance.balance.toFixed(2), // returning balance
  });
});

router.post("/transfer", authMiddleware, async (req, res) => {
  // Transfer Route
  const session = await mongoose.startSession();
  const to = req.body.to;
  const amount = req.body.amount;
  const fromID = req.userId;
  
  session.startTransaction(); // session started

  const account = await Account.findOne({
    // finding current user account
    userId: fromID,
  });

  if (!account || account.balance < amount) {
    // checking balance
    await session.abortTransaction();
    res.json("Insufficient Balance");
    return;
  }

  const toAccount = await Account.findOne({
    // finding receiver user account
    userId: to,
  });

  if (!toAccount) {
    await session.abortTransaction(); // not found then stop session
    res.json("Invalid User");
    return;
  }

  await Account.updateOne(
    // deducting balance from current user
    { userId: fromID },
    { $inc: { balance: -amount } }
  ).session(session);
  await Account.updateOne(
    // adding balance to receiver
    { userId: to },
    { $inc: { balance: amount } }
  ).session(session);

  await session.commitTransaction(); // commit transaction
  res.json({ msg: "Transaction Completed" });
});

module.exports = router;
