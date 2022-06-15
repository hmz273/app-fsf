const jwt = require("jsonwebtoken");
const jwtSecret =
  "4715aed3c946f7b0a38e6b534a9583628d84e96d10fbc04700770d572af3dce43625dd";

exports.userAuth = (req, res, next) => {
  const token = req.cookies.token;
  const { _id } = req.params;
  console.log(req.cookies);
  if (token) {
    jwt.verify(token, jwtSecret, (err, decodedToken) => {
      console.log(decodedToken);
      if (err) {
        return res.status(401).json({ message: "why Not authorized" });
      } 
      else {
        if (decodedToken._id !== _id ) {
          return res.status(401).json({ message: "Not authorized" });
        } else {
          next();
        }
      }
    });
  } else {
    return res
      .status(401)
      .json({ message: "Not authorized, token not available" });
  }
};