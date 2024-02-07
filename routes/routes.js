import { Router } from "express";
import registration from "../controllers/users/registration.js";
import login from "../controllers/users/login.js";
import verifyToken from "../controllers/verifyToken.js";
import { body, validationResult } from "express-validator";
import registerValidation from "../validators/registerValidation.js";
import loginValidation from "../validators/loginValidation.js";
import createProductValidation from "../validators/createProductValidation.js";
import validatorErrorHandler from "../helpers/validatorErrorHandler.js";
import createProduct from "../controllers/products/createproduct.js";
import getProducts from "../controllers/products/getProducts.js";
import getProductById from "../controllers/products/getProductById.js";
import updateProductById from "../controllers/products/updateProductById.js";
import deleteProductById from "../controllers/products/deleteProductById.js";
import fileSingleUploads from "../helpers/uploadSingleFile.js";
import uploadMultipleFiles from "../helpers/uploadMultipleFiles.js";

const router = Router();
// router.post(
//   "/register",
//   body("email").isEmail().normalizeEmail(),
//   body("password").isLength({ min: 6 }).withMessage('password should be more than 6'),
//   registration
// );

router.post("/register", registerValidation, registration);
router.get("/login", loginValidation, login);

router.post(
  "/createProduct",
  verifyToken,
  fileSingleUploads,
  // uploadMultipleFiles,
  createProductValidation,
  validatorErrorHandler,
  createProduct
);

router.get("/getProducts", verifyToken, getProducts);
router.get("/getProductById/:productId", verifyToken, getProductById);
router.patch("/updateProductById/:productId", verifyToken, updateProductById);
router.delete("/deleteProductById/:productId", verifyToken, deleteProductById);
export default router;
