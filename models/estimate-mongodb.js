'use strict';

const util = require('util');
const mongodb = require('mongodb');
const MongoClient = require('mongodb').MongoClient;
const log = require('debug')('estimate:mongodb-model');
const error = require('debug')('estimate:error');
const Estimate = require('../objects/Estimate');

var db;

exports.connectDB = function() {
  return new Promise ((resolve, reject) => {
    if(db) return resolve(db);
    // Connection URL
    var url = process.env.MONGO_URL;
    //Use connect method to connect to the Server
    MongoClient.connect(url, (err, _db) => {
      if(err) return reject(err);
      db = _db;
      resolve(_db);
    });
  });
};

exports.create = function (firstName, lastName, email, phoneNumber, address, comments){
  return exports.connectDB()
  .then(db => {
    var estimate = new Estimate(firstName, lastName, email, phoneNumber, address, comments);
    var collection = db.collection('estimates');
    return collection.insertOne({
      firstName: firstName,
      lastName: lastName,
      email: email,
      phoneNumber: phoneNumber,
      address: address,
      comments: comments
    })
    .then(result => {
      return estimate;
    });
  });
};

exports.update = function(firstName, lastName, email, phoneNumber, address, comments) {
  return exports.connectDB()
  .then(db => {
    var estimate = new Estimate(firstName, lastName, email, phoneNumber, address, comments);
    var collection = db.collection('estimates');
    return collection.updateOne({ email: email }, { $set: { firstName: firstName, lastName: lastName, phoneNumber: phoneNumber, address: address, comments: comments } }).then(result => { return estimate; } );
  });
};

exports.read = function(email) {
  return exports.connectDB()
  .then(db => {
    var collection = db.collection('estimates');
    return collection.findOne({ email: email })
    .then(doc => {
      console.log(doc);
      var estimate = new Estimate(doc.firstName, doc.lastName, doc.email, doc.phoneNumber, doc.address, doc.comments);
      return estimate;
    });
  });
};

exports.destroy = function(email) {
  return exports.connectDB().then(db => {
    var collection = db.collection('estimates');
    return collection.findOneAndDelete({ email: email });
  });
};

exports.keylist = function() {
  return exports.connectDB()
  .then(db => {
    var collection = db.collection('estimates');
    return new Promise((resolve, reject) => {
      var keyz = [];
      collection.find({}).forEach(
        estimate => { keyz.push(estimate.email); },
        err => {
          if (err) reject(err);
          else resolve(keyz);
        }
      );
    });
  });
};

exports.count = function() {
  return exports.connectDB()
  .then(db => {
    var collection = db.collection('estimates');
    return new Promise((resolve, reject) => {
      collection.count({}, (err, count) => {
        if (err) reject(err);
        else resolve(count);
      })
    })
  })
}
