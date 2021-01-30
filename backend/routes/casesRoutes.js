const express = require('express');
const router = express.Router();
const { getAllCases, createCase } = require('../controllers/casesController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, getAllCases);
router.post('/', protect, createCase);
module.exports = router;
