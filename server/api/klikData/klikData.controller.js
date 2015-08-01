'use strict';

var _ = require('lodash');
var KlikData = require('./klikData.model');

// Get list of klikDatas
exports.index = function(req, res) {
  KlikData.find(function (err, klikDatas) {
    if(err) { return handleError(res, err); }
    return res.json(200, klikDatas);
  });
};

// Get a single klikData
exports.show = function(req, res) {
  KlikData.findById(req.params.id, function (err, klikData) {
    if(err) { return handleError(res, err); }
    if(!klikData) { return res.send(404); }
    return res.json(klikData);
  });
};

// Creates a new klikData in the DB.
exports.create = function(req, res) {
  KlikData.create(req.body, function(err, klikData) {
    if(err) { return handleError(res, err); }
    return res.json(201, klikData);
  });
};

// Updates an existing klikData in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  KlikData.findById(req.params.id, function (err, klikData) {
    if (err) { return handleError(res, err); }
    if(!klikData) { return res.send(404); }
    var updated = _.merge(klikData, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, klikData);
    });
  });
};

// Deletes a klikData from the DB.
exports.destroy = function(req, res) {
  KlikData.findById(req.params.id, function (err, klikData) {
    if(err) { return handleError(res, err); }
    if(!klikData) { return res.send(404); }
    klikData.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}