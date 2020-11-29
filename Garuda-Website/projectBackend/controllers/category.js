const Category = require("../models/category"); //l2

exports.getCategoryById = (req, res, next, id) => {
  //l2
  Category.findById(id, (err, cate) => {
    if (err || !cate) {
      return res.status(400).json({
        error: "Category not found in DB",
      });
    }
    req.category = cate;
    next();
  });
};

exports.createCategory = (req, res) => {
  //l3
  const category = new Category(req.body);
  category.save((err, cate) => {
    if (err || !cate) {
      return res.status(400).json({
        error: "Category already exists",
      });
    }
    res.json(cate);
  });
};

exports.getCategory = (req, res) => {
  //l4
  return res.json(req.category);
};

exports.getAllCategory = (req, res) => {
  Category.find((err, items) => {
    if (err || !items) {
      return res.status(400).json({
        error: "Not able to save category in DB",
      });
    }
    res.json(items);
  });
};

exports.updateCategory = (req, res) => {
  //l5
  const category = req.category;
  category.name = req.body.name;

  category.save((err, updatedCategory) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to update category",
      });
    }
    res.json(updatedCategory);
  });
};

exports.removeCategory = (req, res) => {
  //l6
  const category = req.category;
  category.remove((err, category) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to delete this category",
      });
    }
    res.json({
      message: `Successfully deleted ${category.name}`,
    });
  });
};
