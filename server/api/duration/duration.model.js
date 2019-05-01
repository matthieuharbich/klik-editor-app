'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var PolygonSchema = mongoose.model('Polygon').schema;


var DurationSchema = new Schema({
  	duration: Number,
	polygon:[ PolygonSchema ]
});

module.exports = mongoose.model('Duration', DurationSchema);
