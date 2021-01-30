const asyncHandler = require('express-async-handler');
const Solution = require('../models/Solution');

// @desc Get all users from database
// @route GET /api/v1/solutions
// @access Private

const getAllSolutions = asyncHandler(async (req, res) => {
  console.log('solutions');
});

const getSolutionsByCategory = asyncHandler(async (req, res) => {
  const { categoryId } = req.query;

  try {
    const solutions = await Solution.find({ categoryId });

    if (solutions) {
      res.json(solutions);
    } else {
      res.status(404);
      throw new Error('Not Found');
    }
  } catch (error) {
    res.status(500);
    res.json({
      error: error.message,
    });
  }
});

// @desc Get solution by id
// @route GET /api/v1/solutions/:id
// @access Private

const getSolutionById = asyncHandler(async (req, res) => {
  const solutionId = req.params.id;
  const solution = await Solution.findById(solutionId);

  if (solution) {
    res.json(solution);
  } else {
    res.status(404);
    throw new Error('Not Found');
  }
});

// @desc Create new solution in database
// @route POST /api/v1/solutions
// @access Private

const createSolution = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { title, description, categoryId, createdBy } = req.body.solution;
  try {
    const solution = await Solution.create({
      title,
      description,
      categoryId,
      createdBy,
    });

    if (solution) {
      res.status(201);
      res.json(solution);
    }
  } catch (error) {
    res.status(500);
    res.json({
      message: `Server error ${error}`,
    });
  }
});

// @desc Delete solution from database by id
// @route DELETE /api/v1/solutions
// @access Private

const deleteSolution = asyncHandler(async (req, res) => {
  try {
    const solution = await Solution.findOne({ _id: req.params.id });
    if (solution) {
      await Solution.remove(solution);
      res.json({
        message: 'Deleted',
      });
    } else {
      res.status(500);
      throw new Error('Server error');
    }
  } catch (error) {
    res.status(500);
    throw new Error('Server error');
  }
});

// @desc modify solution by id
// @route PUT /api/v1/solutions
// @access Private

const updateSolution = asyncHandler(async (req, res) => {
  if (!req.body.solution) {
    res.status(401);
    throw new Error('Invalid request');
  }
  try {
    const _id = req.body.solution._id;
    await Solution.findOneAndUpdate({ _id }, req.body.solution);
    res.json({ message: 'Updated' });
  } catch (error) {
    res.status(500);
    throw new Error('Server error');
  }
});

module.exports = {
  getAllSolutions,
  getSolutionsByCategory,
  getSolutionById,
  createSolution,
  deleteSolution,
  updateSolution,
};
