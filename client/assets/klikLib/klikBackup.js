function Klik(selecteur, width, height, position) {
        var _this = this; 
        var config = {
        		'selecteur': selecteur,
        		'width': width,
        		'height': height,
        		'position': position
        	}
        var templates = {
        	'paper' : function (paperID) {
        		return '<div id="'+paperID+'" style="position:absolute; width:100%; height:100%; top:0; left:0; z-index:2147483647;"></div>';
        	},
        	'container': function(){
        		return "<div class='"+_this.config.selecteur.substring(1)+"'></div>";
        	}
        }
        var css = {
        	'svg': {
        		'z-index': '2147483647',
        		'position': 'absolute'        		
        	}
        }	
       

        _this.constructLayer = function (videoDom, klik, config, css) {
        	this.video = videoDom;
        	
        	
        	do {
			var paperId =  Math.random().toString(36).substr(2, 9);
			} while ($('#' + paperId).length != 0);
			do {
			var svgId =  Math.random().toString(36).substr(2, 9);
			} while ($('#' + svgId).length != 0);
			var paper = templates.paper(paperId); 
			$(config.selecteur).append(paper);			
			var R = Raphael(paperId,'100%', '100%');
			

			// this.layer = $('#'+paperId).children('svg').get(0);
			// // $(layer).attr('id', svgId);
			// $(this.layer).css(css.svg);
			// this.identification = svgId;
			// this.layer = $(svgId);

    		

    		this.stylise = function(css){

    			// $(this.layer).css(css);
    		}

    		this.adaptLayerToVideo = function(){
    			var video = this.video;
    			var paper = $(this.layer);
    			console.log(video);
    			console.log(paper);
    			adaptPaperToVideo(video, paper);

    		}
    		
   
			return this;
		}
        _this.addLayer = function(){

    		var newLayer = _this.constructLayer(_this.videoDom, _this, config, css);
    
    		return newLayer;        	
        };

        // commentaire ici
		var element = $(config.selecteur);
    	createVideo(element[0], config);
    	
		
		function createVideo(el, Config){			
				_this.videoDom = el;
				_this.config = config;
				var videoTemplate = el;					
				var container = templates.container();
				$(config.selecteur).attr('class', '');
				$(container).insertAfter(el);
				var wrapper = $(config.selecteur);
				$(wrapper).append(el);
				var autoplay = $(el).attr('autoplay');
				var mute = $(el).attr('mute');
				if(autoplay === 'autoplay'){
					el.play();
				};
				if(mute === 'mute' || el.hasAttribute('mute')){
					$(el).prop('muted', true);
				};
			
				switch (config.position) { 
			    case 'center': 
			        wrapper.css('margin-left','auto');
			        wrapper.css('margin-right','auto');
			        break;
			    case 'left': 
			        wrapper.css('margin-right','auto');
			        break;
			    case 'right': 
			        wrapper.css('margin-left','auto');
			        break;      
			    default:
			        wrapper.css('margin-left','auto');
			        wrapper.css('margin-right','auto');
			}
			wrapper.css('position','relative');
			$(videoTemplate).css({
				'width': '100%',
				'height': '100%',
				'background-color':'black'
				// 'position': 'absolute'
			});

			if(config.width === '' && $(el).attr('width') === ''){
				wrapper.css('width', '100%');
			}else if(config.width){
				wrapper.css('width', config.width);
			}else{
				wrapper.css('width', $(el).attr('width'));
			};

			if (config.height === '' && $(el).attr('height') === '') {
				wrapper.css('height','100%');
			}else if(config.height){
				wrapper.css('height', config.height);
			}else{
				wrapper.css('height', $(el).attr('height'));
			};	
		};

		function adaptPaperToVideo(video, paper){
				var video = video;
				var paper = paper;
				if(video.readyState === 4){
					var dimensions = {
			        	'x':video.videoWidth,
			        	'y':video.videoHeight
			        };
			        var ratio = dimensions.x / dimensions.y;       
					var videoElementWidth = $(video).innerWidth();
					var videoElementHeight = $(video).innerHeight();

					var videoElementRatio = videoElementWidth/videoElementHeight;
					if (videoElementRatio <= ratio) {
						paper.css('width', '100%');
						var heightInPx = videoElementWidth/ratio;
						var heightInPercent = (heightInPx/videoElementHeight)*100;
						var marginTop = (100 - heightInPercent)/2;
						paper.css('height', heightInPercent +'%');
						paper.css('left', '0%');
						paper.css('top', marginTop + '%'); 
					} else{
						paper.css('height','100%');
						var widthInPx = videoElementHeight * ratio;
						var widthInPercent = (widthInPx/videoElementWidth)*100;
						var marginLeft = (100 - widthInPercent)/2;
						paper.css('width', widthInPercent + '%');
						paper.css('left', marginLeft + '%');
						paper.css('top', '0');

					};
				}else{
					video.onloadedmetadata = function(){
			        var dimensions = {
			        	'x':video.videoWidth,
			        	'y':video.videoHeight
			        };
			        var ratio = dimensions.x / dimensions.y;       
					var videoElementWidth = $(video).innerWidth();
					var videoElementHeight = $(video).innerHeight();
					var videoElementRatio = videoElementWidth/videoElementHeight;
					if (videoElementRatio <= ratio) {
						paper.css('width', '100%');
						var heightInPx = videoElementWidth/ratio;
						var heightInPercent = (heightInPx/videoElementHeight)*100;
						var marginTop = (100 - heightInPercent)/2;
						paper.css('height', heightInPercent +'%');
						paper.css('left', '0%');
						paper.css('top', marginTop + '%'); 
					} else{
						paper.css('height','100%');
						var widthInPx = videoElementHeight * ratio;
						var widthInPercent = (widthInPx/videoElementWidth)*100;
						var marginLeft = (100 - widthInPercent)/2;
						paper.css('width', widthInPercent + '%');
						paper.css('left', marginLeft + '%');
						paper.css('top', '0');
					};

				}
			}
		}
    	
};



// Klik.prototype.addLayer = function()
// {
    
    
// }








// function createLayers(video){
// 	var paper = '<div id="paper" style="position:absolute; width:100%; height:100%; top:0; left:0; z-index:2147483647;"></div>';
// 	$('#klik-container').append(paper);

// 	var R = Raphael('paper','100%', '100%');
// 	$('#klik-container svg').css("background-color","red");
// 	$('#klik-container svg').css("z-index","2147483647");
// 	$('#klik-container svg').css("opacity","0.2");


// 	$('#klik-container svg').css('position', "absolute");

// 	var actionsLayer = '<div style="position:absolute;  width:10%; height:100%; background-color: yellow; opacity: 0.6; z-index:2147483647; top:-1px; left:0; "></div>';

// 	$('#klik-container').append(actionsLayer);

// 	var controls = '<div id="video-controls" style="position:absolute; width:100%; height: 30px; bottom:0; z-index:2147483647;"><button type="button" id="play-pause">Play</button><input type="range" id="seek-bar" value="0" style="width:60%;"><button type="button" id="mute">Mute</button><input type="range" id="volume-bar" min="0" max="1" step="0.1" value="1"><button type="button" id="full-screen">Full-Screen</button></div>';

// 	$('#klik-container').append(controls);	
// 	videoControls();
	
// };


function isNodeList(nodes) {
  var result = Object.prototype.toString.call(nodes);

  if (
    typeof nodes === 'object'
    &&
    /^\[object (HTMLCollection|NodeList|Object)\]$/.test(result)
    &&
    nodes.hasOwnProperty('length')
    &&
    (nodes.length == 0 || (typeof nodes[0] === "object" && nodes[0].nodeType > 0))
  ) {
    return true;
  }
  return false;
}





// $(function(){	

// 	// createVideo();
// 	// events();
	

	
	
// });

// function getVideoRatio(callback) {
// 	var video = document.getElementById('klik-video');
//     video.onloadedmetadata = function(callback){
//         var dimensions = {
//         	'x':video.videoWidth,
//         	'y':video.videoHeight
//         };
//         var ratio = dimensions.x / dimensions.y;
//         callback(ratio);
//       	// adaptPaperToVideo(ratio);
//     }

//     var yep = 'yep';
//     callback(yep);
    

// };

// function events(){
// 	$(window).on('resize', function(){

// 		adaptPaperToVideo();
// 	})
// }

// function createVideo(){
// 	var container = $('#klik-container');
// 	var videoUrl = container.attr('data-klikUrl');

// 	container.css('position', 'relative');
// 	container.css('height', '400px');
// 	container.css('width', '90%');
// 	container.css('z-index', '#klik-container');
// 	var videoTemplate = '<video id="klik-video" style="background-color:black;" controls width="100%" height="100%"><source src="'+videoUrl+'" type="video/mp4"> Your browser does not support the video tag.</video>';
// 	container.append(videoTemplate);
// 	createLayers();
// 	adaptPaperToVideo();
	
// };

// function createLayers(video){
// 	var paper = '<div id="paper" style="position:absolute; width:100%; height:100%; top:0; left:0; z-index:2147483647;"></div>';
// 	$('#klik-container').append(paper);

// 	var R = Raphael('paper','100%', '100%');
// 	$('#klik-container svg').css("background-color","red");
// 	$('#klik-container svg').css("z-index","2147483647");
// 	$('#klik-container svg').css("opacity","0.2");


// 	$('#klik-container svg').css('position', "absolute");

// 	var actionsLayer = '<div style="position:absolute;  width:10%; height:100%; background-color: yellow; opacity: 0.6; z-index:2147483647; top:-1px; left:0; "></div>';

// 	$('#klik-container').append(actionsLayer);

// 	var controls = '<div id="video-controls" style="position:absolute; width:100%; height: 30px; bottom:0; z-index:2147483647;"><button type="button" id="play-pause">Play</button><input type="range" id="seek-bar" value="0" style="width:60%;"><button type="button" id="mute">Mute</button><input type="range" id="volume-bar" min="0" max="1" step="0.1" value="1"><button type="button" id="full-screen">Full-Screen</button></div>';

// 	$('#klik-container').append(controls);	
// 	videoControls();
	
// };

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
// 			paper.css('left', marginLeft + '%');
// 			paper.css('top', '0');

// 		};
// 	}else{
// 		vid.onloadedmetadata = function(){
//         var dimensions = {
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
// 			paper.css('left', marginLeft + '%');
// 			paper.css('top', '0');
// 		};

// 	}
// 	}

	 
	
// };
