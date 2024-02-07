import jwt from "jsonwebtoken";
import UserModel from "../models/userModel.js";
const verifyToken = (req, res, next) => {
  const headers = req.headers;
  if (headers && headers.authorization && headers.authorization.split(" ")[1]) {
    const token = headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.JSON_SECRET_KEY, (err, decoded) => {
      if (err) {
        res.status(401).send({ err: "Unauthorized" });
        return;
      }
      if (decoded) {
        UserModel.findOne({ _id: decoded.id })
          .then((user) => {
            req.user = user;
            next();
          })
          .catch((err) =>
            res.status(401).send({ error: "unable find correct user" })
          );
      }
    });
  } else {
    res.status(401).send({ err: "add proper headers" });
  }
};
export default verifyToken;
