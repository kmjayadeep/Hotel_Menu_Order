var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/item',require('./item'))
router.use('/order',require('./order'))
router.use('/table',require('./table'))

module.exports = router;
