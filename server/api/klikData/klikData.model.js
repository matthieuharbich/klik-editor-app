'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var KlikDataSchema = new Schema({
  	duration: Number,
	polygon:[{ type: Schema.Types.ObjectId, ref: 'Polygon' }]
		
});

module.exports = mongoose.model('KlikData', KlikDataSchema);


