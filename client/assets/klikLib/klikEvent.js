KlikLayer.prototype.sideBox = function(){
	console.log(this);
	this.layerEventInit.push({
		sideBox: this.id
	})

}

KlikPath.prototype.sideBox = function(){
	// alert(this.polygon.element.name)
	// if(this.video.paused){
	// 	this.video.play();
	// }else{
	// 	this.video.pause();
	// }
	var id = this.layersId[0].sideBox;
	console.log(id)
	$('#'+ id).empty();

	if (this.polygon.element.name) {
		var name = this.polygon.element.name;
	}else{
		var name = '';
	};

	if (this.polygon.element.description) {
		var description = this.polygon.element.description;
	}else{
		var description = '';
	};

	if (this.polygon.element.price) {
		var price = 'Price: ' +this.polygon.element.price + ' $';
	}else{
		var price = '';
	};

	
	$('#'+ id).append('<button style="position:absolute; top: 10px; right: 10px;" id="closeBox"> X </button> <h1 style="text-align: center;">'+ name+'</h1><p style="font-size:1.2em; margin-left: 10px; margin-right: 10px;">'+description+'</p><h4 style="text-align:right; position:absolute; bottom:40px; font-size:1.3; margin-left:10px;">'+price+'</h4>');
	
	$('#'+ id).animate({
		    left: "0%"
		  }, 400, function() {

		  });
	$('#closeBox').on('mousedown',function(){
		$('#'+ id).animate({
		    left: "-100%"
		  }, 400, function() {

		  });
	})
	
	
}