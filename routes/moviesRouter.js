const router = require('express').Router();
const moviesController = require('../controller/moviesController');
const handleErrors = require('../utilities/handleErrors')


router.get('/', handleErrors(moviesController.getMovies));
router.post('/', moviesController.createMovie)
router.get('/:id', handleErrors(moviesController.getMovieById));
router.put('/:id', moviesController.updateMovie);
router.delete('/:id', handleErrors(moviesController.deleteMovie));


module.exports = router;