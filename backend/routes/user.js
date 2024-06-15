const express = require("express");
const jwt = require("jsonwebtoken");
const argon2 = require("argon2");
const z = require("zod");
const { authMiddleware } = require("../middleware");
const { User, Account } = require("../db");
const { JWT_SECRET } = require("../config");
const router = express.Router();

const signupBody = z.object({
  username: z
    .string()
    .email({ message: "Invalid email address" })
    .min(3)
    .max(30)
    .toLowerCase(),
  password: z.string().length(6),
  firstName: z.string().trim().max(50),
  lastName: z.string().trim().max(50),
});

const updateBody = z.object({
  password: z.string().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
});

router.get("/", function (req, res, next) {
  res.json({ message: "user router Working" });
});

router.post("/signup", async (req, res) => {
  const { username, password, firstName, lastName } = req.body;
  const response = signupBody.safeParse(req.body);
  const hash = await argon2.hash(password);
  if (!response.success) {
    return res.status(411).json({ message: "Incorrect inputs" });
  }

  const isExistingUser = await User.findOne({ username });
  if (isExistingUser) {
    return res.status(411).json({ message: "User already exists" });
  }

  const user = await User.create({
    username,
    password: hash,
    firstName,
    lastName,
  });
  const userId = user._id;
  const balance = 1 + Math.random() * 1000;

  await Account.create({
    userId,
    balance,
  });

  const token = jwt.sign({ userId }, JWT_SECRET);

  res.status(200).json({ message: "User created successfully", token });
});

router.put("/", authMiddleware, async (req, res) => {
  const { success } = updateBody.safeParse(req.body);
  const { userId } = req;

  if (!success) {
    res.status(411).json({
      message: "Error while updating information",
    });
  }
  console.log({ userId });
  await User.updateOne({ _id: userId }, req.body);
  res.json({
    message: "Updated successfully",
  });
});

router.get("/bulk", async (req, res) => {
  const filter = req.query.filter || "";

  const users = await User.find({
    $or: [
      {
        firstName: {
          $regex: filter,
        },
      },
      {
        lastName: {
          $regex: filter,
        },
      },
    ],
  });

  res.json({
    user: users.map((user) => ({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      _id: user._id,
    })),
  });
});

module.exports = router;
