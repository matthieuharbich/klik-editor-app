'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ElementSchema = new Schema({
  name: String,
  title: String,
  description: String,
  price: Number,
  triggerEvent: String,
  dataAction:String,
  info: String,
  projectId: { type: Schema.Types.ObjectId, ref: 'Project' }
});

module.exports = mongoose.model('Element', ElementSchema);