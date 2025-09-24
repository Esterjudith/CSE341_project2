const router = require("express").Router();
const indexController = require('../controller/indexController')
const handleErrors = require('../utilities/handleErrors')

router.get('/', handleErrors(indexController.getHome));
router.use('/movies', require('./moviesRouter'))

module.exports = router;