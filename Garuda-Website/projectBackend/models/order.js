const mangoose = require("mongoose");
const { ObjectId } = mangoose.Schema;

const ProductCartSchema = new mangoose.Schema({
  product: {
    type: ObjectId,
    ref: "Product",
  },
  name: String,
  count: Number,
  price: Number,
  mrf: String,
  composition: String,
});
const ProductCart = mangoose.model("ProductCart", ProductCartSchema);

const OrderSchema = new mangoose.Schema(
  {
    products: [ProductCartSchema], //products which are inside cart
    transaction_id: {},
    amount: { type: Number },
    quantity: { type: Number },
    address: {
      name: String,
      line1: String,
      line2: String,
      postal_code: Number,
      city: String,
      state: String,
      country: String,
    },
    droneassigned: {
      type: ObjectId,
      ref: "Drone",
    },
    coordinates: {
      lat: Number,
      lng: Number,
    },
    status: [
      {
        statusname: {
          type: String,
          default: "",
          enum: [
            "Cancelled",
            "Received",
            "Confrimed",
            "Processing",
            "TakeOff",
            "OntheWay",
            "Reached",
            "Delivered",
          ],
        },
        updatetime: {
          type: Date,
          default: () => new Date(),
        },
      },
    ],
    user: {
      type: ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Order = mangoose.model("Order", OrderSchema);

module.exports = { Order, ProductCart };
