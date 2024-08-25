const jwt = require("jsonwebtoken");
const errorHandler = require("../utils/error");
const isAuthorize = (req, res, next) => {
  const { access_token } = req.cookies;

  try {
    if (access_token) {
      const decoded = jwt.verify(access_token, process.env.JWT_SECRET);
      if (!decoded) {
        return next(errorHandler(404, "Error occurred while authenticating"));
      }

      req.USER_ID = decoded.id;

      next();
    } else {
      return next(errorHandler(401, "Unauthorized Access"));
    }
  } catch (err) {
    console.log("----err", err);
    return next(errorHandler(401, "Unauthorized Access"));
  }
};

module.exports = { isAuthorize };
