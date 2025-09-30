const router = require('express').Router();
const moviesController = require('../controller/moviesController');
const handleErrors = require('../utilities/handleErrors')
const { isAuthenticated } = require("../middleware/authenticate")


router.get('/', handleErrors(moviesController.getMovies));
router.get('/:id', handleErrors(moviesController.getMovieById));
router.post('/', isAuthenticated, moviesController.createMovie)
router.put('/:id', isAuthenticated, moviesController.updateMovie);
router.delete('/:id', isAuthenticated, moviesController.deleteMovie);


module.exports = router;