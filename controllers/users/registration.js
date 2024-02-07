import { hash, hashSync } from "bcrypt";
import UserModel from "../../models/userModel.js";
import { validationResult } from "express-validator";
const registration = async (req, res, next) => {
  try {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({
        bodyValidationErrors: error.array({ onlyFirstError: true }),
      });
      // res.status(400).json(error);
    }
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const role = req.body.role;
    const hahsedPassword = hashSync(password, 12);
    const user = UserModel({
      name: name,
      email: email,
      password: hahsedPassword,
      role: role,
    });
    UserModel.findOne({ email: email }).then((registeredUser, err) => {
      if (registeredUser) {
        res.status(400).json({ msg: "User Already exists" });
        return;
      }
      if (err) {
        res.status(500).send({ err });
        return;
      }
      if (!registeredUser) {
        user
          .save()
          .then(() => {
            res.status(200).json({ msg: "sucessfully registred" });
          })
          .catch((err) => {
            res.status(500).json({ msg: "Internal server error" });
          });
      }
    });
  } catch (err) {
    res.status(500).json(err);
  }
};
export default registration;
