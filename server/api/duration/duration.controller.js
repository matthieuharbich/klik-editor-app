'use strict';

var _ = require('lodash');
var Duration = require('./duration.model');
var Point = require('../point/point.model');
var Polygon = require('../polygon/polygon.model');


// mongoose.connect('mongodb://localhost/deep-populate');


// Get list of durations
exports.index = function(req, res) {
  Duration.find()
    .populate('polygon')
    .exec(function(err, duration) {
      if(err) { return handleError(res, err); }

     
      if(!duration) { return res.send(404); }
      return res.json(duration);
    });
};

// Get a single duration
exports.show = function(req, res) {
  Duration.findById(req.params.id)
    .populate('polygon')
    .exec(function (err, duration) {
    if(err) { return handleError(res, err); }
    if(!duration) { return res.send(404); }

   

    // Polygon.populate(duration, {
    //   path:'polygon'
    // },function(err){

    // });


    // populates an array of objects
// User.find(match, function (err, users) {
//   var opts = [{ path: 'company', match: { x: 1 }, select: 'name' }]

//   var promise = User.populate(users, opts);
//   promise.then(console.log).end();
// })

// var users = [{ name: 'Indiana Jones', weapon: 389 }]
// users.push({ name: 'Batman', weapon: 8921 })
// Weapon.populate(users, { path: 'weapon' }, function (err, users) {
//   users.forEach(function (user) {
//     console.log('%s uses a %s', users.name, user.weapon.name)
//     // Indiana Jones uses a whip
//     // Batman uses a boomerang
//   })
// })

    // query = Parent.findOne().populate('childs');        
    // query.exec(function(err, parent) {
    //     if (err) {
    //       //manage error
    //     };
    //     // now we need to populate all childs with their subject
    //     Child.populate(parent.childs, {
    //         path: 'subject.data',
    //         model: 'Subject'
    //     },function(err){
    //       // parent object is completely populated
    //     });
    // });

    
    // for (var i = duration.polygon.length - 1; i >= 0; i--) {
    //   var pts = [];
    //   for (var j = duration.polygon[i].points.length - 1; j >= 0; j--) {
    //      console.log(duration.polygon[i].points[j]);
    //      Point.findById(duration.polygon[i].points[j]).exec(function(err, point){
    //         // console.log(point)
    //         pts.push(point);
    //         // console.log(pts);
    //      console.log(point);
        
       
    //         // console.log(pts);
    //         // console.log(pts)
    //      })

    //    }; 
    //    // duration.polygon[i].points = [];
       
       
    // };


    //     // console.log(pts)




    // // var opts = {
    // //         path: 'polygon.points'
    // //       // , select: '_id'
    // //       // , options: { limit: 2 }
    // //     }
    // // console.log(duration)
 
    // // Duration.populate(duration, opts, function (err, duration) {
    // //   // assert.ifError(err);
    // //   // console.log();
    // //   console.log(duration);
    // //   // done();
    // // })

    return res.json(duration);
  });
};

// BlogPost.find({ tags: 'fun' }).lean().populate('author').exec(function (err, docs) {
//         assert.ifError(err);
 
//         var opts = {
//             path: 'author.friends'
//           , select: 'name'
//           , options: { limit: 2 }
//         }
 
//         BlogPost.populate(docs, opts, function (err, docs) {
//           assert.ifError(err);
//           console.log();
//           console.log(docs);
//           done();
//         })
//       })

// Creates a new duration in the DB.
exports.create = function(req, res) {
  Duration.create(req.body, function(err, duration) {
    if(err) { return handleError(res, err); }
    return res.json(201, duration);
  });
};

// Updates an existing duration in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Duration.findById(req.params.id, function (err, duration) {
    if (err) { return handleError(res, err); }
    if(!duration) { return res.send(404); }
    var updated = _.merge(duration, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, duration);
    });
  });
};

// Deletes a duration from the DB.
exports.destroy = function(req, res) {
  Duration.findById(req.params.id, function (err, duration) {
    if(err) { return handleError(res, err); }
    if(!duration) { return res.send(404); }
    duration.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}