var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('root/index', {
    title: 'Mason McIntyre',
    styles: '',
    scripts: '',
    docreate: 'create',
   });
});

module.exports = router;
