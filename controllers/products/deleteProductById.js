import ProductModel from "../../models/productModel.js";
const deleteProductById = async (req, res, next) => {
  if (req.user.role === "Admin") {
    try {
      const productId = req.params.productId;
      const product = ProductModel.findOne({ _id: productId });
      if (!product) {
        res.status(400).json({ msg: "product does not exists" });
        return;
      }
      const result = await ProductModel.deleteOne({ _id: productId });
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ err: "Something went wrong" });
    }
  } else {
    res.status(400).json({ msg: "Need to have Admin role to delete product" });
  }
};
export default deleteProductById;
