import ProductModel from "../../models/productModel.js";

const updateProductById = async (req, res, next) => {
  if (req.user.role === "Admin") {
    const productId = req.params.productId;
    try {
      const updatedResult = await ProductModel.updateOne(
        { _id: productId },
        {
          $set: {
            productName: req.body.productName,
            productPrice: req.body.productPrice,
            productQuantity: req.body.productQuantity,
          },
        }
      );
      res.status(200).json(updatedResult);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(400).json({ msg: "Need to have Admin role to edit product" });
  }
};
export default updateProductById;
