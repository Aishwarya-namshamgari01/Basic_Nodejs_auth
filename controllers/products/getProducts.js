import ProductModel from "../../models/productModel.js";

const Roles = ["Admin", "User"];

const getProducts = (req, res, next) => {
  const role = req.user.role;
  if (!Roles.includes(role)) {
    res
      .status(400)
      .json({
        msg: "User should have either Admin or User role to view products",
      });
  } else {
    ProductModel.find()
      .then((products) => {
        res.status(200).json(products);
      })
      .catch((err) => res.status(500).json(err));
  }
};
export default getProducts;
