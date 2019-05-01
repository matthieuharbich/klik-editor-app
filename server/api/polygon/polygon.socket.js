/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Polygon = require('./polygon.model');

exports.register = function(socket) {
  Polygon.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Polygon.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('polygon:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('polygon:remove', doc);
}