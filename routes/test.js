var express = require('express');
var router = express.Router();
const util= require('util');
const fs = require('fs');
global.fetch = require('node-fetch')
const cc = require('cryptocompare')

router.get('/', function(req, res, next) {
  res.render('projects/test', {
    title: 'Mason McIntyre',
    styles: ``,
    scripts: ``,
   });
});

router.post('/from-file', function(req, res, next) {
  util.log(req);
  res.render('projects/test', {
    title: 'Mason McIntyre',
    styles: ``,
    scripts: ``,
   });
});

module.exports = router;
