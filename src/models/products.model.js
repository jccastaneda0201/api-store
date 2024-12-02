const { Schema, model } = require("mongoose");

// Product schema
const productSchema = new Schema(
  {
    name: String,
    description: String,
    price: Number,
    departament: String,
    stock: Number,
    available: Boolean,
    creator: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Product = model("Product", productSchema);

module.exports = Product;
