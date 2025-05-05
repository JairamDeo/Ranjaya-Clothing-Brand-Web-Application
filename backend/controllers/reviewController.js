const Review = require('../models/Review');

exports.addReview = async (req, res) => {
  const { rating, comment } = req.body;
  const review = new Review({
    product: req.params.productId,
    user: req.user.id,
    rating,
    comment,
  });
  await review.save();
  res.status(201).json(review);
};

exports.getReviews = async (req, res) => {
  const reviews = await Review.find({ product: req.params.productId }).populate('user', 'name');
  res.json(reviews);
};
