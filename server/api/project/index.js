'use strict';

var express = require('express');
var controller = require('./project.controller');




var router = express.Router();

router.get('/last', controller.last);
router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.post('/upload', controller.uploadVideo);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;