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
    scripts: `<script type="text/javascript" src="http://code.jquery.com/jquery-latest.min.js"></script>
              <script type="text/javascript" src="/javascripts/draw/draw.js"></script>`,
    docreate: 'create',
   });
});

router.get('/senior-project', function(req, res, next) {
  res.render('projects/senior-project', {
    title: 'Senior Project',
    styles: `<link type="text/css" rel="stylesheet" href="/stylesheets/senior-project.css></link>`,
    scripts: `<script type="text/javascript" src="http://code.jquery.com/jquery-latest.min.js"></script>
              <script type="text/javascript" src="/javascripts/senior-project/run.js"></script>`,
    docreate: 'create',
   });
});

module.exports = router;
