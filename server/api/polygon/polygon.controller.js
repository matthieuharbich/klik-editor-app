'use strict';

var _ = require('lodash');
var Polygon = require('./polygon.model');

// Get list of polygons
exports.index = function(req, res) {
  Polygon.find()
    .populate('points')
    .populate('element')
    .exec(function(err, polygon) {
      if(err) { return handleError(res, err); }
      if(!polygon) { return res.send(404); }
      return res.json(polygon);
    });
};

// Get a single polygon
exports.show = function(req, res) {
  Polygon.findById(req.params.id)
    .populate('element')
    .populate('points')
    .exec(function(err, polygon) {
      if(err) { return handleError(res, err); }
      if(!polygon) { return res.send(404); }
      return res.json(polygon);
    });

  // Polygon.findById(req.params.id, function (err, polygon) {
  //   if(err) { return handleError(res, err); }
  //   if(!polygon) { return res.send(404); }
  //   return res.json(polygon);
  // });
};

// Creates a new polygon in the DB.
exports.create = function(req, res) {
  Polygon.create(req.body, function(err, polygon) {
    if(err) { return handleError(res, err); }
    return res.json(201, polygon);
  });
};

// Updates an existing polygon in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Polygon.findById(req.params.id, function (err, polygon) {
    if (err) { return handleError(res, err); }
    if(!polygon) { return res.send(404); }
    var updated = _.merge(polygon, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, polygon);
    });
  });
};

// Deletes a polygon from the DB.
exports.destroy = function(req, res) {
  Polygon.findById(req.params.id, function (err, polygon) {
    if(err) { return handleError(res, err); }
    if(!polygon) { return res.send(404); }
    polygon.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}