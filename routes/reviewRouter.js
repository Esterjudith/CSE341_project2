const router = require('express').Router();
const reviewsController = require('../controller/reviewsController')

router.get('/',reviewsController.getAllReviews);
router.post('/', reviewsController.createReview);
router.get('/:id', reviewsController.getReviewById);
router.put('/:id', reviewsController.updateReview);
router.delete('/:id', reviewsController.deleteReview);

module.exports = router;