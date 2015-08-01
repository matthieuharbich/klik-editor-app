'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var PointSchema = new Schema({
	x: Number,
	y: Number
});

module.exports = mongoose.model('Point', PointSchema);