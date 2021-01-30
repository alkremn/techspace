const asyncHandler = require('express-async-handler');
const Case = require('../models/Case');

const getAllCases = asyncHandler(async (req, res) => {
  res.json({
    message: 'Here are cases',
  });
});

const createCase = asyncHandler(async (req, res) => {
  const { caseNumber, title, description, createdBy } = req.body;

  try {
    const createdCase = await Case.create({
      caseNumber,
      title,
      description,
      createdBy,
    });

    res.json({
      createdCase,
    });
  } catch (error) {
    res.status(500);
    throw new Error('Unable to create a case');
  }
});

module.exports = {
  getAllCases,
  createCase,
};
