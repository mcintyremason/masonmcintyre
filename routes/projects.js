var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('projects/index', {
    title: 'Mason McIntyre',
    docreate: 'create',
   });
});

router.get('/draw', function(req, res, next) {
  res.render('projects/draw', {
    title: 'Draw',
    docreate: 'create',
   });
});

module.exports = router;
