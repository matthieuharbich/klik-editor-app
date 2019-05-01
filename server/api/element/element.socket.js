/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Element = require('./element.model');

exports.register = function(socket) {
  Element.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Element.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('element:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('element:remove', doc);
}