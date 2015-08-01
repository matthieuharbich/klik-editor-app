'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var PointSchema = mongoose.model('Point').schema;



var PolygonSchema = new Schema({
    // id: Number,
    element: { type: Schema.Types.ObjectId, ref: 'Element' },
	visible: Boolean,
	points:[ PointSchema ]
});

module.exports = mongoose.model('Polygon', PolygonSchema);
