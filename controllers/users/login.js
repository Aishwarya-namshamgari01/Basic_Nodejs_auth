import { compare, compareSync } from "bcrypt";
import UserModel from "../../models/userModel.js";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";

const login = async (req, res, next) => {
  //   try {
  //     const email = req.body.email;
  //     const password = req.body.password;
  //     const user = await UserModel.findOne({ email: email });
  //     if (user) {
  //       compare(password, user.password).then((result) => {
  //         if (result) {
  //           res.status(200).json({ msg: "sucessfully logged in" });
  //         } else {
  //           res.status(401).json({ msg: "unauthorized, Please check your password" });
  //         }
  //       });
  //     } else {
  //         res.status(401).json({msg: "Please check your email & password"});
  //     }
  //   } catch (err) {
  //     res.status(500).send("Internal server error");
  //   }

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      bodyValidationErrors: errors.array({ onlyFirstError: true }),
    });
  }

  const email = req.body.email;
  const password = req.body.password;
  UserModel.findOne({ email: email }).then((user, err) => {
    if (err) {
      res.status(500).send({ err });
      return;
    }
    if (!user) {
      res.status(401).send({ msg: "User Not Found" });
      return;
    }

    const validPassword = compareSync(password, user.password);
    if (!validPassword) {
      res.status(401).send({ msg: "Invalid password", accessToken: null });
      return;
    }

    const token = jwt.sign(
      {
        email: user.email,
        password: user.password,
        id: user._id,
        role: user.role
      },
      process.env.JSON_SECRET_KEY,
      {
        expiresIn: 86400,
      }
    );
    res.status(200).send({
      user: { name: user.name, email: user.email, id: user._id },
      accessToken: token,
      msg: "login sucessful",
    });
  });
};
export default login;
