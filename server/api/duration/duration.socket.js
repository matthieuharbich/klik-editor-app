/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Duration = require('./duration.model');

exports.register = function(socket) {
  Duration.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Duration.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('duration:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('duration:remove', doc);
}