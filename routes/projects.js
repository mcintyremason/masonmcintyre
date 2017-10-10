var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Mason McIntyre',
    docreate: 'create',
   });
});

router.get('/draw', function(req, res, next) {
  res.render('draw', {
    title: 'Mason McIntyre',
    docreate: 'create',
   });
});

module.exports = router;
