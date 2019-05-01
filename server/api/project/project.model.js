'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var deepPopulate = require('mongoose-deep-populate');
var DurationSchema = mongoose.model('Duration').schema;

    

var ProjectSchema = new Schema({
  name: String,
  description: String,
  number: {type: String, default: 'yeah'},
  _elements: [ { type: Schema.Types.ObjectId, ref: 'Element' } ],
  videoPath: String,
  thumbPath: String,
  klikData: [DurationSchema]  
 
});

module.exports = mongoose.model('Project', ProjectSchema);
ProjectSchema.plugin(deepPopulate);