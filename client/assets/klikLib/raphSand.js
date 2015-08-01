$(function(){
	var R = Raphael('paper','100%','100%');
	var paper = $('#paper svg');
	var polygonPoints = '26.5,32.75 25.563,62.313 56.625,62.563 32,56';
	// pointsToPath(polygonPoints);
	// var tri = R.path(convertedPath + 'Z').attr('fill', 'red');
	
	var points = [];
	var res = '';
	var x = 1;
	var polygon = R.path("");
	var edition = false;
	$('svg cricle').css('z-index', '21231');
	paper.on('click', function(e){
		edition = true;
		if(edition){
			getPos(e);
		};
		return false;
	});

	paper.on('dblclick', function(e){
		edition = false;
		getPos(e);
	});
	function pointsToPath(pointsString, e){
		
		var convertedPath = pointsString.replace(/([0-9.]+),([0-9.]+)/g, function($0, x, y) {
		    return 'L ' + Math.floor(x) + ' ' + Math.floor(y);
		}).replace(/^L/, 'M');		
		if(e.type === 'click'){
			polygon.attr('path',convertedPath).attr('fill', 'red');
		}else if(e.type === 'dblclick'){
			polygon.attr('path',convertedPath + ' Z').attr('fill', 'red');
		}

	}
	function getPos(e){
		var pointPos = {
    		"x": e.offsetX,
	      	"y": e.offsetY
    	}
    	var ptn = pointPos.x + ','+pointPos.y+' ';
    	res += ptn;
    	console.log(res);
    	var paperWidth = paper.offsetWidth;
    	console.log(pointPos); 
    	R.circle(pointPos.x, pointPos.y, 3).attr('fill', 'green');
    	points.push(pointPos);
    	pointsToPath(res, e);
    	
	}
});