'use strict';

var path = require('path');
var express = require('express');
var router = express.Router();
var estimate = require(process.env.ESTIMATES_MODEL ? path.join('..', process.env.ESTIMATES_MODEL) : '../models/estimate-mongodb');


router.get('/', function(req, res, next){
  res.render('roof', {
    title: "Fleck Roofing & Construction"
  });
});

// Add Estimate.
router.get('/add', (req, res, next) => {
  res.render('index', {
    title: 'Get an Estimate',
    docreate: true,
  });
});

// Save Estimate
router.post('/save', (req, res, next) => {
  var p;
  if (req.body.docreate === "create") {
    p = estimate.create(req.body.firstName, req.body.lastName, req.body.email, req.body.phoneNumber, req.body.address, req.body.comments);
  } else {
    p = estimate.update(req.body.firstName, req.body.lastName, req.body.email, req.body.phoneNumber, req.body.address, req.body.comments);
  }
  p.then(estimate => {
    res.redirect('/roof/view?email=' + req.body.email);
  })
  .catch(err => { next(err); });
});

router.get('/view', (req, res, next) => {
  estimate.read(req.query.key)
  .then(note => {
    res.render('index', {
        title: estimate ? estimate.title : "",
    });
  })
  .catch(err => { next(err); });
});

/*
router.get('/edit', (req, res, next) => {
  notes.read(req.query.key)
  .then(note => {
    res.render('index', {
      title: estimate ? ("Estimate " + estimate.title) : "Get an Estimate",
      docreate: false,
    });
  })
  .catch(err => { next(err); });
});

router.get('/destroy', (req, res, next) => {
  notes.read(req.query.key)
  .then(estimate => {
    res.render('index', {
      title: estimate ? estimate.email : "",
    });
  })
  .catch(err => { next(err); });
});

router.post('/destroy/confirm', (req, res, next) => {
  estimate.destroy(req.body.email)
  .then(() => { res.redirect('/'); })
  .catch( err => { next(err); });
});

*/

module.exports = router;
