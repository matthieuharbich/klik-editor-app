$(function(){	
	console.log('in lib');
	createVideo();
	events();
	

	
	
});

function getVideoRatio(callback) {
	var video = document.getElementById('klik-video');
    video.onloadedmetadata = function(callback){
        var dimensions = {
        	'x':video.videoWidth,
        	'y':video.videoHeight
        };
        var ratio = dimensions.x / dimensions.y;
        callback(ratio);
      	// adaptPaperToVideo(ratio);
    }

    var yep = 'yep';
    callback(yep);
    

};

function events(){
	$(window).on('resize', function(){

		adaptPaperToVideo();
	})
}

function createVideo(){
	var container = $('#klik-container');
	var videoUrl = container.attr('data-klikUrl');
	console.log(videoUrl);
	container.css('position', 'relative');
	container.css('height', '400px');
	container.css('width', '90%');
	container.css('z-index', '#klik-container');
	var videoTemplate = '<video id="klik-video" style="background-color:black;" controls width="100%" height="100%"><source src="'+videoUrl+'" type="video/mp4"> Your browser does not support the video tag.</video>';
	container.append(videoTemplate);
	createLayers();
	adaptPaperToVideo();
	
};

function createLayers(video){
	var paper = '<div id="paper" style="position:absolute; width:100%; height:100%; top:0; left:0; z-index:2147483647;"></div>';
	$('#klik-container').append(paper);

	var R = Raphael('paper','100%', '100%');
	$('#klik-container svg').css("background-color","red");
	$('#klik-container svg').css("z-index","2147483647");
	$('#klik-container svg').css("opacity","0.2");


	$('#klik-container svg').css('position', "absolute");

	var actionsLayer = '<div style="position:absolute;  width:10%; height:100%; background-color: yellow; opacity: 0.6; z-index:2147483647; top:-1px; left:0; "></div>';

	$('#klik-container').append(actionsLayer);

	var controls = '<div id="video-controls" style="position:absolute; width:100%; height: 30px; bottom:0; z-index:2147483647;"><button type="button" id="play-pause">Play</button><input type="range" id="seek-bar" value="0" style="width:60%;"><button type="button" id="mute">Mute</button><input type="range" id="volume-bar" min="0" max="1" step="0.1" value="1"><button type="button" id="full-screen">Full-Screen</button></div>';

	$('#klik-container').append(controls);	
	videoControls();
	
};

function videoControls(){

	var video = $('#klik-video');
	$('#play-pause').on('click', function(){
		
		if(video[0].paused){
			video[0].play();
		}else{
			video[0].pause();
		}
		return false;
	});

	$('#full-screen').on('click',function(){
		adaptPaperToVideo(2.35);
		if (video[0].requestFullscreen) {
		  video[0].requestFullscreen();
		  video[0].removeAttribute('controls');
		} else if (video[0].mozRequestFullScreen) {
		  video[0].mozRequestFullScreen();
		  video[0].removeAttribute('controls');

		} else if (video[0].webkitRequestFullscreen) {
		  video[0].webkitRequestFullscreen();
		  video[0].removeAttribute('controls');

		}
	});

	$('#mute').on('click', function(){
		
		
		if (video.prop('muted') === false) {
			video.prop('muted', true);
		} else{
			video.prop('muted', false);
		};
		
	});

	$("#seek-bar").on("change", function() {
		var duration = video[0].duration;
		var position = $(this).val();

		var time = duration*(position/100);
		
	  	video[0].currentTime = time;
	  	  	
		
	});

	video[0].ontimeupdate = function(){
		var time = video[0].currentTime;
		var duration = video[0].duration;

		var position = (time/duration)*100;

		$("#seek-bar").val(position);
	};

	$('#volume-bar').on('change', function(){
		var position = $(this).val();
		var vol = position
		video[0].volume = vol; 
	});
};

function adaptPaperToVideo(){
	var vid = document.getElementById('klik-video');
	var video = $('#klik-video');
	var paper = $('#klik-container svg');
	if(video[0].readyState === 4){
		var dimensions = {
        	'x':video[0].videoWidth,
        	'y':video[0].videoHeight
        };
        var ratio = dimensions.x / dimensions.y;       
		var videoElementWidth = video.innerWidth();
		var videoElementHeight = video.innerHeight();

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
		vid.onloadedmetadata = function(){
        var dimensions = {
        	'x':video[0].videoWidth,
        	'y':video[0].videoHeight
        };
        var ratio = dimensions.x / dimensions.y;       
        console.log(ratio);
		var videoElementWidth = video.innerWidth();
		var videoElementHeight = video.innerHeight();

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

	 
	
};
