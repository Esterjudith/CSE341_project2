const router = require('express').Router();
const reviewsController = require('../controller/reviewsController');
const { isAuthenticated } = require("../middleware/authenticate");

router.get('/',reviewsController.getAllReviews);
router.get('/:id', reviewsController.getReviewById);
router.post('/', isAuthenticated, reviewsController.createReview);
router.put('/:id', isAuthenticated, reviewsController.updateReview);
router.delete('/:id', isAuthenticated, reviewsController.deleteReview);

module.exports = router;