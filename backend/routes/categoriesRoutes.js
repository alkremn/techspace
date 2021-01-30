const router = require('express').Router();
const { protect } = require('../middleware/authMiddleware');
const { getAllCategories } = require('../controllers/categoriesController');

router.get('/', protect, getAllCategories);

module.exports = router;
