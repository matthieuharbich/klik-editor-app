/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var KlikData = require('./klikData.model');

exports.register = function(socket) {
  KlikData.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  KlikData.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('klikData:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('klikData:remove', doc);
}