import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    id: { type: String, required: true },
    quantity: { type: Number, required: true, default: 0 },
    price: { type: Number, required: true },
    Sold:Number,
    StockR:Number,
    prixDachat:Number,
    Fayda:Number,
    Remise:Number
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
