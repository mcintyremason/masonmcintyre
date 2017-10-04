var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Fleck Roofing & Construction',
    docreate: 'create',
   });
});

module.exports = router;
