import mongoose, { Schema } from "mongoose";

const ProductSchema = Schema(
  {
    productName: {
      type: String,
      required: true,
    },
    productPrice: {
      type: Number,
      required: true,
    },
    productQuantity: {
      type: Number,
      required: true,
    },
    productImage: {
      type: Array,
    },
  },
  {
    timestamps: true,
  }
);

const ProductModel = mongoose.model("prodcuts", ProductSchema);

export default ProductModel;
