var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('root/index', {
    title: 'Mason McIntyre',
    styles: '',
    scripts: '',
   });
});

router.get('/resume', function(req, res, next) {
  res.render('root/resume', {
    title: 'Mason McIntyre',
    styles: '',
    scripts: '',
   });
});

module.exports = router;
