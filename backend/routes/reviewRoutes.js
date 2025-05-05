const express = require('express');
const router = express.Router();
const { addReview, getReviews } = require('../controllers/reviewController');
const auth = require('../middleware/authMiddleware');

router.post('/:productId', auth, addReview);
router.get('/:productId', getReviews);

module.exports = router;
