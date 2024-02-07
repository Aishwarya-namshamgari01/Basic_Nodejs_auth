import { body } from "express-validator";
import ProductModel from "../models/productModel.js";

const createProductValidation = [
  body("productName")
    .exists("falsy")
    .withMessage("Product name must not be empty")
    .isString()
    .withMessage("Product name must be string")
    .custom(async (value, req) => {
      const data = await ProductModel.findOne({ productName: value });
      if (data) {
        return Promise.reject("Product already exists");
      }
    }),

  body("productPrice")
    .isNumeric()
    .withMessage("product price should be number"),

  body("productQuantity")
    .isInt({ min: 1 })
    .withMessage("quantity should be atleast one"),
];

export default createProductValidation;
