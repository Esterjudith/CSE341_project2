const router = require("express").Router();
const indexController = require('../controller/indexController')
const handleErrors = require('../utilities/handleErrors')
const passport = require('passport');

router.get('/', handleErrors(indexController.getHome));
router.use('/movies', require('./moviesRouter'));
router.use('/review', require('./reviewRouter'));
router.use('/', require('./swagger'));

router.get('/login', passport.authenticate('github'), (req, res) => {});

router.get('/logout', function (req, res, next) {
  req.logout(function (err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});


module.exports = router;