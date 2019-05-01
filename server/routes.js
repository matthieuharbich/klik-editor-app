/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');
var FileStore = require('express-file-store');
 
// using file system 
var fileStore = FileStore('fs', {
  path: __dirname + '/public/uploads'
});


module.exports = function(app) {

  // Insert routes below
  app.use('/api/points', require('./api/point'));
  app.use('/api/polygons', require('./api/polygon'));
  app.use('/api/durations', require('./api/duration'));
  app.use('/api/klikDatas', require('./api/klikData'));
  app.use('/api/elements', require('./api/element'));
  app.use('/api/projects', require('./api/project'));
  app.use('/api/things', require('./api/thing'));
  app.use('/api/users', require('./api/user'));
  // app.use(fileStore.routes);


  app.use('/auth', require('./auth'));
  
  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendfile(app.get('appPath') + '/index.html');
    });
};
