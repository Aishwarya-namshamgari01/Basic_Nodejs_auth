import { body, check } from "express-validator";

const validRoles = ["Admin", "User"];
const registerValidation = [
  body("name")
    .exists("falsy")
    .withMessage("Name is required")
    .isString()
    .withMessage("name should string"),

  body("email").isEmail().withMessage("Email should be valid"),
  
  check(
    "password",
    "Please enter a password at least 8 character and contain At least one uppercase.At least one lower case.At least one special character. "
  )
    .isLength({ min: 8 })
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/),

  body("role")
    .exists("falsy")
    .withMessage("Role must not be empty")
    .custom((role, req) => {
      if (!validRoles.includes(role)) {
        throw new Error("Role can be either Admin or User");
      }
      return true;
    }),
];
export default registerValidation;
