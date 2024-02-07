import multer from "multer";
import ProductModel from "../../models/productModel.js";

const createProduct = async (req, res, next) => {
  console.log({ req: req });
  if (req.user?.role !== "Admin") {
    res.status(400).json({
      msg: "Can't create an product, For this please login as Admin user",
    });
  } else {
    if (!req.file) {
      res.status(400).json({ msg: "Please upload valid file.." });
      return;
    }
    const product = ProductModel({
      productName: req.body.productName,
      productPrice: req.body.productPrice,
      productQuantity: req.body.productQuantity,
      productImage: req?.file?.path,
    });
    product
      .save()
      .then(() => {
        res.status(200).json({ msg: "product created sucessfully" });
      })
      .catch((err) => res.status(500).json(err));
  }
};
export default createProduct;
