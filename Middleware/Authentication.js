const JWT = require("jsonwebtoken");

const authVerify = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decodedToken = JWT.verify(token, process.env.JWT_SECRET_KEY);
      req.user = decodedToken;
      next();
    } catch (error) {
      console.log(error);
      res.status(401).json(error?.response?.data);
    }
  }
  if (!token) {
    res.status(401).json({ message: "Not authorized" });
  }
};

module.exports = { authVerify };
