'use strict';

angular.module('msrsApp')
  .directive('raphael', function () {
    
  

  return {
        restrict: 'E',
        templateUrl: 'app/raphael/raphaelDirective.html',
        scope: {
            dset: '='
        },
        link: function(scope, element, attrs) {
            var R = Raphael(element[0], "100%","400");
            var paper = angular.element(element[0]);
            scope.points = [];
            paper.click(getPosition);
            function getPosition(e){
            	var pointPos = {
            		"x": e.offsetX,
			      	"y": e.offsetY
            	}
            	var paperWidth = element[0].offsetWidth;
            	
            	scope.points.push(pointPos);
            	console.log(pointPos); 
        		console.log(scope.points);
            }

             var videoWidth = angular.element('#videoss');
 			 console.log(videoWidth);

   			var p1 = R.circle(3, 50, 5).attr("fill", "blue");
			var p2 = R.circle(200, 100, 5).attr("fill", "blue");
			var p3 = R.circle(200, 200, 5).attr("fill", "blue");
			var p4 = R.circle(100, 200, 5).attr("fill", "blue");
			var p5 = R.circle(100, 100, 5).attr("fill", "blue");

			// Modified from: http://stackoverflow.com/questions/9956186/raphael-js-maintain-path-between-two-objects
			// Call paper.connect(obj1,obj2,attributes)
			// That draws a line between the two objects and maintains the line when the objects are animated
			Raphael.fn.connect = function(obj1, obj2, attribs) {
			    // list of paths each object has
			    if (!obj1.connections) obj1.connections = []
			    if (!obj2.connections) obj2.connections = []
			    // get the bounding box of each object
			    var box1 = obj1.getBBox()
			    var box2 = obj2.getBBox()
			    // create a line/path from object 1 to object 2
			    var p = this.path("M" + (box1.x + box1.width / 2) + ","
			            + (box1.y + box1.height / 2) + "L" + (box2.x + box2.width / 2)
			            + "," + (box2.y + box2.height / 2))
			    // adjust attributes of the path
			    p.attr(attribs)
			    // set the start and end element for this path
			    p.startElement = obj1;
			    p.endElement = obj2;
			    // add the path to each of the object
			    obj1.connections.push(p)
			    obj2.connections.push(p)
			    // mark each object as being connected
			    obj1.connected = true;
			    obj2.connected = true;
			    // listen for the Raphael frame event
			    eve.on("raphael.drag.*", function(obj) {
			        // if the object the frame event is fired on is connected
			        if (this.connected) {
			            // for each connection on this object
			            for ( var c in this.connections) {
			                var path = this.connections[c]; // temp path
			                var b1 = path.startElement.getBBox(); // get the current
			                                                        // location of start
			                                                        // element
			                var b2 = path.endElement.getBBox();// get the current location
			                                                    // of end element
			                // move the path to the new locations
			                path.attr({
			                    path : "M " + (b1.x + b1.width / 2) + " "
			                            + (b1.y + b1.height / 2) + "L "
			                            + (b2.x + b2.width / 2) + " "
			                            + (b2.y + b2.height / 2),
			                    opacity : Math.max(path.startElement.attr('opacity'),
			                            path.endElement.attr('opacity'))
			                });
			            }
			        }
			    });
			}

			// connect adjacent polygon points
			R.connect(p1,p2,{stroke:"red"});
			R.connect(p2,p3,{stroke:"red"});
			R.connect(p3,p4,{stroke:"red"});
			R.connect(p4,p5,{stroke:"red"});
			R.connect(p5,p1,{stroke:"red"});

			// make points draggable
			var start = function () {
			    this.ox = this.attr("cx");
			    this.oy = this.attr("cy");
			},
			move = function (dx, dy) {
			    this.attr({cx: this.ox + dx, cy: this.oy + dy});
			},
			up = function () {};
			R.set(p1,p2,p3,p4,p5).drag(move, start, up);
				  	

        }
    }});






           	// var circle = r.circle(50,40,10);
           	// circle.attr('fill','red');
           	// circle.click(function(){
           	// 	console.log('circle');
           	// });

           	 // var R = Raphael(0, 0, "100%", "100%");
           

   //          var r = R.circle(100, 100, 50).attr({fill: "hsb(0, 1, 1)", stroke: "black", opacity: .5});
   //          var g = R.circle(210, 50, 50).attr({fill: "hsb(.3, 1, 1)", stroke: "none", opacity: .5});
   //          var b = R.circle(320, 100, 50).attr({fill: "hsb(.6, 1, 1)", stroke: "none", opacity: .5});
   //          var p = R.circle(430, 100, 50).attr({fill: "hsb(.8, 1, 1)", stroke: "none", opacity: .5});
   //          scope.elements = {};
   //          scope.elements = {
   //          	'elArray': [r]
   //          }

   //          var polygon = [];
   //          var paper = angular.element(element[0]);
   //          paper.click(CanvasClick);
   //          paper.dblclick(CanvasDblClick);
   //          scope.clicks = [];
   //          function CanvasClick(e) {
			//     if (true)
			//     {

			//       var w = R.circle(e.offsetX, e.offsetY, 5).attr({fill: "hsb(0, 1, 1)", stroke: "black", opacity: .5});
			      

			      

			//       var click = {
			//       	"x": e.offsetX,
			//       	"y": e.offsetY
			//       }

			//       scope.clicks.push(click);
			//       console.log(scope.clicks);
			//       console.log(scope.clicks.length);
			//       polygon = [];
			//       if(scope.clicks.length > 1){
			//       	 var pointM = ['M',scope.clicks[scope.clicks.length - 2].x,scope.clicks[scope.clicks.length - 2].y];
			//       	 console.log(pointM);
			//       	 var pointL = ['L',scope.clicks[scope.clicks.length - 1].x,scope.clicks[scope.clicks.length - 1].y];
			      	 
			//       	 polygon.push(pointM);
			//       	 polygon.push(pointL);
			      	 
			      	
			// 		renderPoly(polygon);
			//       };
			      
					

			//     }
			// };

			// function CanvasDblClick(e){
			// 	polygon.push('Z');
			// 	console.log(polygon);
			// };
           
   //              var start = function () {
   //                  this.ox = this.attr("cx");
   //                  this.oy = this.attr("cy");
   //                  this.animate({r: 70, opacity: .25}, 500, ">");
   //              },
   //              move = function (dx, dy) {
   //                  this.attr({cx: this.ox + dx, cy: this.oy + dy});
   //              },
   //              up = function () {
   //                  this.animate({r: 50, opacity: .5}, 500, ">");
   //              };
   //              R.set(scope.elements).drag(move, start, up);   

   //              function renderPoly(polygon){
			// 		R.path(polygon).attr('fill', 'red')
   //              }
