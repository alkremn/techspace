const asyncHandler = require('express-async-handler');
const Category = require('../models/Category');

const getAllCategories = asyncHandler(async (req, res) => {
  setTimeout(async () => {
    const categories = await Category.find({});
    res.json(categories);
  }, 1000);
});

module.exports = {
  getAllCategories,
};
