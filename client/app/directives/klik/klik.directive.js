'use strict';

angular.module('msrsApp')
  .directive('klik', function () {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
  
	      	var klik = new Klik('.'+attrs.class);
		    var polyLayer = klik.addGraphicLayer('red', 0.4);
		 	var video = $('.'+attrs.class).children('video');
		 	var first = true;
		 	var polygone1 = '';
		 	var edit = false;
		 	scope.polygones = [];



	


		   scope.$watch('curT', function(){
		   		video[0].currentTime = scope.curT;
		   })
		   // video.currenTime = 10;


	      	polyLayer.stylise({
	      		// 'background-color': 'pink',
	      		// 'opacity': 0.2
	      	})
	      	polyLayer.adaptToVideo();
	      	polyLayer.polygonView(scope.hashEditor);
	      	$(window).on('resize', function(){
	      		polyLayer.adaptToVideo();
	      	})

	      	$('#content-resizer').on('mousedown', function(event) {
				event.preventDefault();

				$(document).on('mousemove', mousemove);
				$(document).on('mouseup', mouseup);
			});
			$('#mainEditor-resizer').on('mousedown', function(event) {
				event.preventDefault();

				$(document).on('mousemove', mousemove);
				$(document).on('mouseup', mouseup);
			});

			function mousemove(event) {

				polyLayer.adaptToVideo();
				update();
			}

			function mouseup() {
				$(document).unbind('mousemove', mousemove);
				$(document).unbind('mouseup', mouseup);
			}
			 
			function update(){
				for (var i = scope.polygones.length - 1; i >= 0; i--) {


			 			scope.polygones[i].update(scope.polygones[i].getPoints());
			 		};
			}

         $('.play-pause').on('click',function(){
         	
            klik.togglePlayPause();
            if ($('.play-pause span').hasClass('glyphicon-pause')) {
	       		 $('.play-pause span').removeClass('glyphicon-pause').addClass('glyphicon-play');

		      }else{
		        $('.play-pause span').removeClass('glyphicon-play').addClass('glyphicon-pause');

		      };
          })

         $('.step-forward').on('click', function(){
         	klik.nextFrame();
         })

         $('.step-backward').on('click', function(){
         	klik.previousFrame();
         });

         $('#newPolygon').on('click', function(){
         	edit = true;

         	if(edit === true){

				 	polygone1 = polyLayer.newPolygon();
				 	scope.polygones.push(polygone1);

				 	$('#' + polygone1.paperId).children('svg').on('click', function(e){
					 	if (first && edit) {

					 		var dim = klik.getVideoDimensions();
					 		var posX = (e.offsetX/dim.width)*100;
					 		var posY = (e.offsetY/dim.height)*100;

					 		var pointPos = {
					    		"x": posX,
						      	"y": posY
					    	}

					    	var pointPosEditor = {
					    		"x": e.offsetX,
						      	"y": e.offsetY
					    	}


						 	var points = polygone1.addPoint(pointPosEditor);

						 	scope.postPoint(pointPos);
						 	first = false;
						 	};
						 	 setTimeout(function(){
						 	 	first = true;
						 	 },300);

					 	 
					 			
					 });

				 	$('#' + polygone1.paperId).children('svg').on('dblclick', function(e){

				 		scope.postPolygon();
				 		
				 		polygone1.stop();
				 		polygone1 = '';
				 		edit = false;



				 		

				 	});
				 	$('.' + polygone1.polyClass).on('click', function(){

				 	})
				 	$('#updatePolygon').on('click', function(){
				 		// polygone1.update();
				 		
				 	});

				 	$(window).on('resize', function(){

				 		update();

				 	})



         	}
         	


			 });

      }
  	}
});



  //     	 var R = Raphael('paper','100%', '100%');
  //     	 var paper = $( "#paper" ).find( "svg" );
  //     	 var elementPoints = [];
  //     	 var currentPath = null;
 	// 	 var shapes = [];
 	// 	 var closeTolerance = 10;
  //     	 videoControls();
		//  adaptPaperToVideo();
		//  events();
		//  onElementClick();

		// function events(){
		// 	var video = $('#klik-video');
		// 	var paper = $('#klik-container svg');
			
		// 	var dimensions = {
	 //        	'x':video[0].videoWidth,
	 //        	'y':video[0].videoHeight
	 //        };
	 //        var ratio = dimensions.x / dimensions.y;       
		// 	var videoElementWidth = video.innerWidth();
		// 	var videoElementHeight = video.innerHeight();
		// 	var videoElementRatio = videoElementWidth/videoElementHeight;
		// 	if (videoElementRatio <= ratio) {
		// 		var witdthInPx = videoElementWidth;
		// 		var heightInPx = videoElementWidth/ratio; 
		// 	} else{
		// 		var heightInPx = videoElementHeight;
		// 		var widthInPx = videoElementHeight * ratio;
		// 	};

		// 	scope.width = widthInPx;

		// 	$(window).on('resize', function(){
		// 		adaptPaperToVideo();
		// 		elementScales();
				
		// 	});

		// 	$('#mainEditor-resizer').on('mousedown',function(){
		// 		$(window).on('mousemove', mousemove);
		// 		$(this).on('mouseup',mouseup);
		// 	});

		// 	$('#content-resizer').on('mousedown',function(){
		// 		$(window).on('mousemove', mousemove);
				
		// 		$(window).on('mouseup',mouseup);
		// 	});	

			
			

		// 	paper.on('click',addPoint);	
			


		// }

		// function elementScales(){
		// 	var video = $('#klik-video');
		// 	var paper = $('#klik-container svg');
			
		// 	var dimensions = {
	 //        	'x':video[0].videoWidth,
	 //        	'y':video[0].videoHeight
	 //        };
	 //        var ratio = dimensions.x / dimensions.y;       
		// 	var videoElementWidth = video.innerWidth();
		// 	var videoElementHeight = video.innerHeight();
		// 	var videoElementRatio = videoElementWidth/videoElementHeight;
		// 	if (videoElementRatio <= ratio) {
		// 		var witdthInPx = videoElementWidth;
		// 		var heightInPx = videoElementWidth/ratio; 
		// 	} else{
		// 		var heightInPx = videoElementHeight;
		// 		var widthInPx = videoElementHeight * ratio;
		// 	};

		// 	if (scope.width < widthInPx) {
		// 		var deltaRatio = (scope.width/widthInPx);
		// 		scope.width = widthInPx;

		// 		$.each(shapes,function(key,shape){
		// 			shape.transform('s' + deltaRatio,deltaRatio, 0,0);
		// 		});
		// 	}else{
		// 		var deltaRatio = (scope.width/widthInPx);


		// 		scope.width = widthInPx;
		// 		$.each(shapes,function(key,shape){
		// 			shape.transform('s' + deltaRatio,deltaRatio, 0,0);
					
		// 		});
				
		// 	};

			
		// }

		

		// function addPoint(e){			
		// 	var pointPos = {
		// 		"x": e.offsetX,
		// 		"y": e.offsetY
		// 	}	
		// 	var path = R.path([['M',10, 10],['L', 300, 15],['L', 34, 39],['L', 500, 100],['Z']]);

	 //      	 path.attr({
	 //      	 	fill:'blue',
	 //      	 	'stroke-width': '5px',
	 //      	 	width: 100
	 //      	 })
	 //      	 path.transform("t20,30");
	 //      	 path.scale(1.2,1.2);

		// 	var video = $('#klik-video');
		// 	var videoElementWidth = video.innerWidth();
		// 	var videoElementHeight = video.innerHeight();
		// 	var dimensions = {
	 //        	'x':video[0].videoWidth,
	 //        	'y':video[0].videoHeight
	 //        }; 	        
	 //        var ratio = dimensions.x / dimensions.y;       
		// 	var videoElementRatio = videoElementWidth/videoElementHeight;
		// 	if (videoElementRatio <= ratio) {
		// 		var widthInPx = videoElementWidth;
		// 		var heightInPx = videoElementWidth/ratio;
		// 	} else{
		// 		var heightInPx = videoElementHeight;
		// 		var widthInPx = videoElementHeight * ratio;
		// 	};
		// 	var Xpercentage = (pointPos.x/widthInPx)*100 - 0.3;
		// 	var Ypercentage = (pointPos.y/heightInPx)*100 + 0.3;
		// 	var p = R.circle(Xpercentage + '%', Ypercentage + '%' , '0.7%').attr('fill', 'blue');
			
		// 	elementPoints.push(pointPos);
		// 	drawPolygon(elementPoints);

		// 	var x = e.offsetX, y = e.offsetY;

		//     if (!currentPath) {
		//       currentPath = newPath(x, y);
		//     } else if (currentPath.shouldClose(x, y)) {
		//       currentPath.closePath();
		//       newShape(currentPath.path);
		//       currentPath = null;
		//     } else {
		//       currentPath.addPoint(x, y);
		//     }

		    
		    

		// }

		// function newShape(shape) {
		//     shapes.push(shape);
		//     shape.attr('fill', 'white');
		//     shape.hover(function () {
		//       shape.attr('fill', 'blue');
		//     }, function () {
		//       shape.attr('fill', 'white');
		//     });
		//   }

		//   Raphael.el.addPart = function (point) {
		//     if (this.type != 'path') {
		//       throw new TypeError('addPart can only be used on paths');
		//     }
		//     var pathParts = this.attr('path') || [];
		//     pathParts.push(point);
		//     this.attr('path', pathParts);
		//     return this;
		//   };

		//   function newPath(startX, startY) {
		//     var path = R.path().addPart(['M', startX, startY]);
		//     scope.path = path;
		//     return {
		//       path: path,
		//       addPoint: function (x, y) {
		//         path.addPart(['L', x, y]);
		//       },
		//       closePath: function () {
		//         path.addPart(['Z']);


		//       },
		//       shouldClose: function (x, y) {
		//         return Math.abs(startX - x) < closeTolerance &&
		//           Math.abs(startY - y) < closeTolerance;
		//       }
		//     };
		//   }

		// function drawPolygon(arrayOfPoints){
		// 	$.each(arrayOfPoints, function(index, point){
		// 		var path = R.path(['M', 10,10]);
		// 		if(index === 0){
		// 			var point = {
		// 				letter: 'M',
		// 				x: point.x,
		// 				y:point.y
		// 			}
					

		// 		}else{
		// 			var point = {
		// 				letter: 'L',
		// 				x: point.x,
		// 				y:point.y
		// 			}
		// 			// path.attrs.path.push(point);
		// 		}

		// 	});
		// }

		// function mousemove(){
		// 	adaptPaperToVideo();
		// 	var vid = document.getElementById('klik-video');
		// 	var video = $('#klik-video');
		// 	var paper = $('#klik-container svg');
			
		// 	var dimensions = {
	 //        	'x':video[0].videoWidth,
	 //        	'y':video[0].videoHeight
	 //        };
	 //        var ratio = dimensions.x / dimensions.y;       
		// 	var videoElementWidth = video.innerWidth();
		// 	var videoElementHeight = video.innerHeight();
		// 	var videoElementRatio = videoElementWidth/videoElementHeight;
		// 	if (videoElementRatio <= ratio) {
		// 		var witdthInPx = videoElementWidth;
		// 		var heightInPx = videoElementWidth/ratio; 
		// 	} else{
		// 		var heightInPx = videoElementHeight;
		// 		var widthInPx = videoElementHeight * ratio;
		// 	};

			


		// 	$.each(shapes,function(key,shape){
		// 		shape.scale(1 + 0.001,0.99);
		// 	});
		// }

		// function mouseup() {

		// 	$(window).unbind('mousemove', mousemove);
		// 	$('#mainEditor-resizer').unbind('mouseup', mouseup);
		// 	$('#content-resizer').unbind('mouseup', mouseup);
		// }

		// function videoControls(){
		// 	var video = $('#klik-video');
		// 	$('#play-pause').on('click', function(){				
		// 		if(video[0].paused){
		// 			video[0].play();
		// 		}else{
		// 			video[0].pause();
		// 		}
		// 		return false;
		// 	});

		// 	$('#full-screen').on('click',function(){
		// 		adaptPaperToVideo(2.35);
		// 		if (video[0].requestFullscreen) {
		// 		  video[0].requestFullscreen();
		// 		  video[0].removeAttribute('controls');
		// 		} else if (video[0].mozRequestFullScreen) {
		// 		  video[0].mozRequestFullScreen();
		// 		  video[0].removeAttribute('controls');
		// 		} else if (video[0].webkitRequestFullscreen) {
		// 		  video[0].webkitRequestFullscreen();
		// 		  video[0].removeAttribute('controls');
		// 		}
		// 	});

		// 	$('#mute').on('click', function(){					
		// 		if (video.prop('muted') === false) {
		// 			video.prop('muted', true);
		// 		} else{
		// 			video.prop('muted', false);
		// 		};				
		// 	});

		// 	$("#seek-bar").on("change", function() {
		// 		var duration = video[0].duration;
		// 		var position = $(this).val();
		// 		var time = duration*(position/100);				
		// 	  	video[0].currentTime = time; 	
				
		// 	});

		// 	video[0].ontimeupdate = function(){
		// 		var time = video[0].currentTime;
		// 		var duration = video[0].duration;
		// 		var position = (time/duration)*100;
		// 		$("#seek-bar").val(position);
		// 	};

		// 	$('#volume-bar').on('change', function(){
		// 		var position = $(this).val();
		// 		var vol = position
		// 		video[0].volume = vol; 
		// 	});
		// };

		// function adaptPaperToVideo(){
		// 	var vid = document.getElementById('klik-video');
		// 	var video = $('#klik-video');
		// 	var paper = $('#klik-container svg');
		// 	if(video[0].readyState === 4){
		// 		var dimensions = {
		//         	'x':video[0].videoWidth,
		//         	'y':video[0].videoHeight
		//         };
		//         var ratio = dimensions.x / dimensions.y;       
		// 		var videoElementWidth = video.innerWidth();
		// 		var videoElementHeight = video.innerHeight();
		// 		var videoElementRatio = videoElementWidth/videoElementHeight;
		// 		if (videoElementRatio <= ratio) {
		// 			paper.css('width', '100%');
		// 			var heightInPx = videoElementWidth/ratio;
		// 			var heightInPercent = (heightInPx/videoElementHeight)*100;
		// 			var marginTop = (100 - heightInPercent)/2;
		// 			paper.css('height', heightInPercent +'%');
		// 			paper.css('left', '0%');
		// 			paper.css('top', marginTop + '%'); 
		// 		} else{
		// 			paper.css('height','100%');
		// 			var widthInPx = videoElementHeight * ratio;
		// 			var widthInPercent = (widthInPx/videoElementWidth)*100;
		// 			var marginLeft = (100 - widthInPercent)/2;
		// 			paper.css('width', widthInPercent + '%');
		// 			paper.css('top', '0');

		// 		};
		// 	}else{
		// 		vid.onloadedmetadata = function(){
		// 	        var dimensions = {
		// 	        	'x':video[0].videoWidth,
		// 	        	'y':video[0].videoHeight
		// 	        };
		// 	        var ratio = dimensions.x / dimensions.y;       
		// 			var videoElementWidth = video.innerWidth();
		// 			var videoElementHeight = video.innerHeight();

		// 			var videoElementRatio = videoElementWidth/videoElementHeight;
		// 			if (videoElementRatio <= ratio) {
		// 				paper.css('width', '100%');
		// 				var heightInPx = videoElementWidth/ratio;
		// 				var heightInPercent = (heightInPx/videoElementHeight)*100;
		// 				var marginTop = (100 - heightInPercent)/2;
		// 				paper.css('height', heightInPercent +'%');
		// 				paper.css('left', '0%');
		// 				paper.css('top', marginTop + '%'); 
		// 			} else{
		// 				paper.css('height','100%');
		// 				var widthInPx = videoElementHeight * ratio;
		// 				var widthInPercent = (widthInPx/videoElementWidth)*100;
		// 				var marginLeft = (100 - widthInPercent)/2;
		// 				paper.css('width', widthInPercent + '%');
		// 				paper.css('top', '0');
		// 			};

		// 		}
		// 	}			
		// };

		// function onElementClick(){
		// 	$('circle').on('click', function(){


				
		// 	});
		// }
