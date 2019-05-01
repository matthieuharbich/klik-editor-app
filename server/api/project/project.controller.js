'use strict';

var _ = require('lodash');
var Project = require('./project.model');
// var ffmpegi = require('liquid-ffmpeg');
// var ffmpeg = require('fluent-ffmpeg');
var fs = require('fs');
var path = require('path');
var Busboy = require('busboy');
var formidable = require('formidable'),
    util = require('util');

var multiparty = require('connect-multiparty'),
    multipartyMiddleware = multiparty();




// Get list of projects
exports.index = function(req, res) {
  Project.find()
    .deepPopulate('_elements klikData.polygon.element')
    .exec(function (err, projects) {
      if(err) { return handleError(res, err); }
      return res.json(200, projects);
    });
};

// Get a single project
exports.show = function(req, res) {
   Project.findById(req.params.id)

    .deepPopulate('_elements klikData.polygon.element')

    .exec(function(err, project) {
      if(err) { return handleError(res, err); }
      if(!project) { return res.send(404); }
      return res.json(project);
    });
};

// Get the last project
exports.last = function(req, res) {

  Project.find(function (err, projects) {
      if(err) { return handleError(res, err); }

      
      return res.json(200,  _.last(projects));
    });
    
     
  
};

//uploading video
exports.uploadVideo = function(req, res){
  var form = new formidable.IncomingForm();

    form.parse(req, function(err, fields, files) {
      // res.writeHead(200, {'content-type': 'text-plain'});
      res.json(files);
      res.end();

    });
    // form.encoding = 'utf-8';
    form.keepExtensions = true;
    form.uploadDir = "client/assets/projects/videos/";
    form.type = true;
    form.on('progress', function(bytesReceived, bytesExpected) {

    });
    form.on('file', function(name, file) {



       // var proc = new ffmpeg({ source: file.path })
       //  .takeScreenshots({
       //      size: '600x?',
       //      timemarks: [ '10%', '20%', '60%'],
       //      filename: '%b_%i'
       //    }, 'client/assets/projects/images', function(err, filenames) {


       //      res.json(filenames);
       //  });
    });

   





    return;

};

// Creates a new project in the DB.
exports.create = function(req, res) {


  Project.create(req.body, function(err, project) {
      // var proc = new ffmpegi({ source: 'server/assets/vids/bg.mp4', timeout: 3000 })
      //     .toFormat('webm')
      //     .withVideoCodec('vp8')
      //     .withSize('1920x?')
      //     .onProgress(function(progress) {

      //     })
      //     .saveToFile('server/assets/vids/bgdbien.webm', function(stdout, stderr) {

      // });

    // var proc = new ffmpeg({ source: 'server/assets/vids/bg.mp4' })
    //   // .withSize('50%')
    //   .takeScreenshots(5, 'server/assets/vids', function(err, filenames) {


    //   });

    // var command = new ffmpeg('server/assets/vids/bgd6.avi')
    //   .withVideoCodec('libvpx')
    //   .addOptions(['-qmin 0', '-qmax 50', '-crf 5'])
    //   .withVideoBitrate(1024)
    //   .withAudioCodec('libvorbis')
    //   // .onProgress(function(progress) {

    //   //   })
    //   .on('error', function(err) {

    //   })
    //   .on('end', function() {

    //   })
    //   .saveToFile('server/assets/vids/output.webm');


  
    
    if(err) { return handleError(res, err); }
    return res.json(201, project);
  });
};

// Updates an existing project in the DB.
exports.update = function(req, res) {

  
  if(req.body._id) { delete req.body._id; }
  Project.findById(req.params.id, function (err, project) {
    if (err) { return handleError(res, err); }
    if(!project) { return res.send(404); }
    if (req.query.duration) {
      
      for (var i = project.klikData.length - 1; i >= 0; i--) {


        if(project.klikData[i].duration == req.query.duration){

          var duration = project.klikData[i];

          duration.polygon.push(req.body);
          project.save();
        }
      };
      
   return res.json(200, duration);
    
  };
    var updated = _.merge(project, req.body);



    updated.klikData.push(req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, project);
    });
  });
};

// Deletes a project from the DB.
exports.destroy = function(req, res) {
  Project.findById(req.params.id, function (err, project) {
    if(err) { return handleError(res, err); }
    if(!project) { return res.send(404); }
    project.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}


