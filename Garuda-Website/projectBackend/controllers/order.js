const { ProductCart, Order } = require("../models/order");

exports.getOderById = (req, res, next, id) => {
  Order.findById(id)
    .populate("products.product", "name price") //doubt
    .exec((err, order) => {
      // console.log();
      // console.log(order.user);
      // console.log(req.profile._id);
      if (err || !order) {
        res.status(400).json({
          error: "No oder exist with this id",
        });
      } else if (order.user._id.toString() !== req.profile._id.toString()) {
        res.status(400).json({
          error: "You can not acess this order data",
        });
      }
      req.order = order;
      next();
    });
};

exports.getAOrder = (req, res) => {
  res.json(req.order);
};

exports.createOrder = (req, res) => {
  req.body.order.user = req.profile;
  const order = new Order(req.body.order);
  order.save((err, order) => {
    if (err || !order) {
      res.status(400).json({
        error: "Failed to save your order to DB",
      });
    }
    res.json(order);
  });
};

exports.getAllorders = (req, res) => {
  Order.find()
    .populate("user", "_id name")
    .sort([["createdAt", "desc"]])
    .exec((err, orders) => {
      if (err || orders.length === 0) {
        return res.status(400).json({
          error: "No Orders found in DB",
        });
      }
      res.json(orders);
    });
};

exports.getAllordersOfUser = (req, res) => {
  Order.find({ user: req.profile._id })
    .populate("user", "_id name")
    .sort([["createdAt", "desc"]])
    .exec((err, orders) => {
      if (err || orders.length===0) {
        return res.status(400).json({
          error: "No order found in Database",
        });
      }
      res.json(orders);
    });
};

exports.getOrderStatus = (req, res) => {
  res.json(Order.schema.path("status").enumValues);
};

exports.updateStatus = (req, res) => {
  Order.updateOne(
    { _id: req.body.orderId },
    { $push: { status: req.body.status } },
    { new: true },
    (err, orders) => {
      if (err || !orders) {
        res.status(400).json({
          error: "Can not update order status",
        });
      }
      res.json(orders);
    }
  );
};
