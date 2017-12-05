var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('projects/index', {
    title: 'Mason McIntyre',
    styles: ``,
    scripts: ``,
   });
});

router.get('/draw', function(req, res, next) {
  res.render('projects/draw', {
    title: 'Draw',
    styles: ``,
    scripts: `<script type="text/javascript" src="http://code.jquery.com/jquery-latest.min.js"></script>
              <script type="text/javascript" src="/js/projects/draw/draw.js"></script>`,
   });
});

router.get('/senior-project', function(req, res, next) {
  res.render('projects/senior-project', {
    title: 'Senior Project',
    styles: ``,
    scripts: `<script type="text/javascript" src="http://code.jquery.com/jquery-latest.min.js"></script>
              <script type="text/javascript" src="/js/projects/senior-project/run.js"></script>`,
   });
});

module.exports = router;
