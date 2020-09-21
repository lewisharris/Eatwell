const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    const token = req.header("x-auth-token");
    //validation
    // if no token present - 401 (unauthorised)
    if (!token) {
      return res
        .status(401)
        .json({ message: "No auth token, authorisation denied" });
    }
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) {
      return res
        .status(401)
        .json({ message: "Token verification failed, authorisation denied" });
    }
    req.user = verified.id;
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = auth;
