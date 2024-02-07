import ProductModel from "../../models/productModel.js";

const getProductById = (req, res, next) => {
  const productId = req.params.productId;
  ProductModel.findOne({ _id: productId })
    .then((product) => {
      res.status(200).json(product);
    })
    .catch((err) => res.status(500).json(err));
};
export default getProductById;
