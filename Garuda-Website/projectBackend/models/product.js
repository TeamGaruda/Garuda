const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 100,
    },
    composition: {
      type: String,
      trim: true,
      maxlength: 2000,
    },
    uses: {
      type: String,
      trim: true,
      maxlength: 2000,
    },
    price: {
      type: Number,
      trim: true,
      required: true,
      maxlength: 32,
    },
    mrf: {
      type: String,
      trim: true,
      maxlength: 200,
    },
    category: {
      type: ObjectId,
      ref: "Category",
      required: true,
    },
    nooftablets: {
      type: Number,
    },
    stock: {
      type: Number,
    },
    sold: {
      type: Number,
      default: 0,
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
