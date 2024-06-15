const { JWT_SECRET } = require("./config");
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith("Bearer ")) {
    res.status(404).json({ message: "Incorrect auth header" });
  }
  const token = authorization.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    if (decoded.userId) {
      req.userId = decoded.userId;
      next();
    } else {
      res.status(404).json({ error: "wrong jwt decoded" });
    }
  } catch (error) {
    console.log(error);
    res.status(403).send("Unauthorized");
  }
};

module.exports = {
  authMiddleware,
};
