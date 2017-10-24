var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('projects/index', {
    title: 'Mason McIntyre',
    styles: '',
    scripts: '',
    docreate: 'create',
   });
});

router.get('/draw', function(req, res, next) {
  res.render('projects/draw', {
    title: 'Draw',
    styles: ``,
    scripts: `<script src="http://code.jquery.com/jquery-latest.min.js"></script>
              <script type="text/javascript" src="/javascripts/draw.js"></script>`,
    docreate: 'create',
   });
});

module.exports = router;
