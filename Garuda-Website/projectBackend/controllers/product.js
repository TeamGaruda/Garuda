const Product = require("../models/product");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
const product = require("../models/product");

exports.getProductById = (req, res, next, id) => {
  Product.findById(id)
    .populate("category")
    .exec((err, product) => {
      if (err || !product) {
        return res.status(400).json({
          error: "Product not found in DB",
        });
      }
      req.product = product;
      next();
    });
};

exports.createProduct = (req, res) => {
  let form = formidable({ keepExtensions: true });
  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "problem with image",
      });
    }
    //destructure the fields...fields comes from frontend from form and we require these value for our data base and we update sold with middleware
    const {
      name,
      composition,
      uses,
      nooftablets,
      mrf,
      price,
      category,
      stock,
    } = fields;
    console.log(fields);
    if (
      !name ||
      !composition ||
      !uses ||
      !nooftablets ||
      !mrf ||
      !price ||
      !category ||
      !stock
    ) {
      //insted of this we can give express-validator in route like we do in auth route
      return res.status(400).json({
        error: "please include all fields",
      });
    }
    //TODO restriction on field

    let product = new Product(fields);

    //handle file here
    if (file.photo) {
      if (file.photo.size > 3 * 1024 * 1024) {
        return res.status(400).json({
          error: "File size is too big",
        });
      }
      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;
    }
    //save into DB
    product.save((err, product) => {
      console.log(err);
      if (err) {
        return res.status(400).json({
          error: "failed to save to DB",
        });
      }
      res.json(product);
    });
  });
};

exports.getProduct = (req, res) => {
  req.product.photo = undefined;
  return res.json(req.product);
};

exports.photo = (req, res, next) => {
  if (req.product.photo.data) {
    res.set("Content-Type", req.product.photo.contentType);
    return res.send(req.product.photo.data);
  }
  next();
};

exports.deleteProduct = (req, res) => {
  let product = req.product;
  product.remove((err, deletedProduct) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to delete this product",
      });
    }
    res.json({
      message: `Successfully deleted ${deletedProduct.name}`,
      deletedProduct,
    });
  });
};

exports.updateProduct = (req, res) => {
  let form = formidable({ keepExtensions: true });
  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "problem with image",
      });
    }

    //updation code
    let product = req.product;
    console.log(product);
    product = _.assignIn(product, fields);
    // var product4=new Product({...product,...fields});
    //     console.log(product4);

    //handle file here
    if (file.photo) {
      if (file.photo.size > 3 * 1024 * 1024) {
        return res.status(400).json({
          error: "File size is too big",
        });
      }
      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;
    }
    //save into DB
    product.save((err, product) => {
      if (err) {
        return res.status(400).json({
          error: "Updation of product failed",
        });
      }
      res.json(product);
    });
  });
};
exports.getProductsByCategory = (req, res) => {
  let cateId = req.category._id;
  Product.find({ category: cateId })
    .populate("category")
    .select("-photo")
    .sort([["_id", "asc"]])
    .exec((err, products) => {
      if (err) {
        return res.status(400).json({
          error: "No product found",
        });
      }
      res.json(products);
    });
};
exports.getAllProducts = (req, res) => {
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";

  Product.find()
    .populate("category")
    .select("-photo")
    .sort([[sortBy, "asc"]])
    .exec((err, products) => {
      if (err) {
        return res.status(400).json({
          error: "No product found",
        });
      }
      res.json(products);
    });
};

exports.getAllUniqueCategories = (req, res) => {
  Product.distinct("category", {}, (err, categories) => {
    if (err) {
      return res.status(400).json({
        error: "No category found",
      });
    }
    res.json(categories);
  });
};

//Middleware
exports.updateStock = (req, res, next) => {
  let myOperations = req.body.order.products.map((prod) => {
    return {
      updateOne: {
        filter: { _id: prod._id },
        update: { $inc: { stock: -prod.count, sold: +prod.count } },
      },
    };
  });

  Product.bulkWrite(myOperations, (err, products) => {
    if (err) {
      return res.status(400).json({
        error: "Bulk updation failed",
      });
    }
    next();
  });
};
