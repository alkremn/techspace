const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  getAllSolutions,
  getSolutionsByCategory,
  getSolutionById,
  createSolution,
  deleteSolution,
  updateSolution,
} = require('../controllers/solutionsController');

router.get('/', protect, getAllSolutions);
router.get('/query', protect, getSolutionsByCategory);
router.get('/:id', protect, getSolutionById);
router.post('/', protect, createSolution);
router.delete('/:id', protect, deleteSolution);
router.put('/', protect, updateSolution);

module.exports = router;
