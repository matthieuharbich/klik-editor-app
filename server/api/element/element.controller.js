'use strict';

var _ = require('lodash');
var Element = require('./element.model');
var Project = require('../project/project.model');

// Get list of elements
exports.index = function(req, res) {
  Element.find(function (err, elements) {
    if(err) { return handleError(res, err); }
    return res.json(200, elements);
  });
};

// Get a single element
exports.show = function(req, res) {
  Element.findById(req.params.id, function (err, element) {
    if(err) { return handleError(res, err); }
    if(!element) { return res.send(404); }
    return res.json(element);
  });
};

// Creates a new element in the DB.
exports.create = function(req, res) {

  Element.create(req.body, function(err, elementSave) {     
    if(err) { return handleError(res, err); }
    Project.findById(req.body.projectId, function(err, project) {
      if (project) {
        project._elements.push(elementSave.id);
        project.save(function(err, projectSaved) {
          if (err) return validationError(res, err);  
          return res.json(201, elementSave);      
        });
      } else {
         res.send(403);
      }
    });
    
  });
  
};

// Updates an existing element in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Element.findById(req.params.id, function (err, element) {
    if (err) { return handleError(res, err); }
    if(!element) { return res.send(404); }
    var updated = _.merge(element, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, element);
    });
  });
};

// Deletes a element from the DB.
exports.destroy = function(req, res) {
  Element.findById(req.params.id, function (err, element) {
    if(err) { return handleError(res, err); }
    if(!element) { return res.send(404); }
    element.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}