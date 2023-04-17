const { Op } = require('sequelize');
const Review = require('../models/review.model');



// Create a new review
const createReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const review = await Review.create({ rating, comment });
    res.status(201).json(review);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get all reviews
const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.findAll();
    res.status(200).json(reviews);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get a review by ID
const getReviewById = async (req, res) => {
  try {
    const { id } = req.params;
    const review = await Review.findByPk(id);
    if (!review) {
      res.status(404).json({ message: `Review with ID ${id} not found` });
    } else {
      res.status(200).json(review);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update a review by ID
const updateReviewById = async (req, res) => {
  try {
    const { id } = req.params;
    const { rating, comment } = req.body;
    const [numRowsUpdated, [updatedReview]] = await Review.update(
      { rating, comment },
      { returning: true, where: { id } }
    );
    if (numRowsUpdated === 0) {
      res.status(404).json({ message: `Review with ID ${id} not found` });
    } else {
      res.status(200).json(updatedReview);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete a review by ID
const deleteReviewById = async (req, res) => {
  try {
    const { id } = req.params;
    const numRowsDeleted = await Review.destroy({ where: { id } });
    if (numRowsDeleted === 0) {
      res.status(404).json({ message: `Review with ID ${id} not found` });
    } else {
      res.status(204).end();
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};


const getReviews = async (req, res) => {
  const { rating, laptopId } = req.query;
  const { page = 1, limit = 10 } = req.query;

  const where = {};
  if (rating) {
    where.rating = rating;
  }
  if (laptopId) {
    where.laptop_id = laptopId;
  }

  const offset = (page - 1) * limit;

  const { count, rows } = await Review.findAndCountAll({
    where,
    limit,
    offset,
  });

  const totalPages = Math.ceil(count / limit);

  return res.json({
    data: rows,
    page,
    totalPages,
    totalCount: count,
  });
};




module.exports = {getReviews,
  createReview,
  getAllReviews,
  getReviewById,
  updateReviewById,
  deleteReviewById
};
