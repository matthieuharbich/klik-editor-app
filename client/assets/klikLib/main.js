$(function(){
	 


	 // var video2 = new Klik('.klik2','20%','');
	 // var video3 = new Klik('.klik3','24%','100px');
	 // var ouzbek = new Klik('.newClickVideo','70%');

	 // console.log(video1.videoDom);
	 // var layer1 = video3.addLayer();
	 // var layer2 = video2.addLayer();
	 // var layer3 = video3.addLayer();
	
	var data = [
	{
		"duration":5.2,
		"polygon":[
			{
				"id":1,
				"color":"green",
				"elementId":1,
				"visible":false,
				"points":[
					{
						"id":1,
						"x": 20,
						"y":40
					},
					{
						"id":2,
						"x": 46,
						"y":40
					},
					{
						"id":3,
						"x": 50,
						"y":30
					}
				]
			},
			{
				"id":2,
				"color":"yellow",
				"elementId":1,
				"visible":true,
				"points":[
					{
						"id":1,
						"x": 20,
						"y":40
					},
					{
						"id":2,
						"x": 46,
						"y":70
					},
					{
						"id":3,
						"x": 2,
						"y":3
					}
				]
			},
			{
				"id":3,
				"color":"pink",
				"elementId":1,
				"visible":true,
				"points":[
					{
						"id":1,
						"x": 54,
						"y":40
					},
					{
						"id":2,
						"x": 36,
						"y":40
					},
					{
						"id":3,
						"x": 10,
						"y":30
					}
				]
			}
		]
	},
	{
		"duration":3,
		"polygon":[
			{
				"id":1,
				"elementId":1,
				"visible":true,
				"points":[
					{
						"id":1,
						"x": 60,
						"y":30
					},
					{
						"id":2,
						"x": 76,
						"y":60
					},
					{
						"id":3,
						"x": 20,
						"y":60
					}
				]
			},
			{
				"id":22,
				"elementId":1,
				"visible":true,
				"points":[
					{
						"id":1,
						"x": 60,
						"y":30
					},
					{
						"id":2,
						"x": 76,
						"y":60
					},
					{
						"id":3,
						"x": 20,
						"y":60
					}
				]
			}
		]
	},
	{
		"duration":8,
		"polygon":[
			{
				"id":2,
				"elementId":1,
				"visible":true,
				"points":[
					{
						"id":1,
						"x": 100,
						"y":100
					},
					{
						"id":2,
						"x": 1,
						"y":60
					},
					{
						"id":3,
						"x": 20,
						"y":60
					}
				]
			},
			{
				"id":12,
				"color":"blue",
				"elementId":1,
				"visible":true,
				"points":[
					{
						"id":1,
						"x": 100,
						"y":3
					},
					{
						"id":2,
						"x": 76,
						"y":60
					},
					{
						"id":3,
						"x": 20,
						"y":60
					}
				]
			},
			{
				"id":22,
				"color":"blue",
				"elementId":1,
				"visible":true,
				"points":[
					{
						"id":1,
						"x": 100,
						"y":3
					},
					{
						"id":2,
						"x": 76,
						"y":60
					},
					{
						"id":3,
						"x": 20,
						"y":60
					}
				]
			},
			{
				"id":3,
				"elementId":1,
				"visible":true,
				"points":[
					{
						"id":1,
						"x": 100,
						"y":100
					},
					{
						"id":2,
						"x": 22,
						"y":60
					},
					{
						"id":3,
						"x": 20,
						"y":1
					},
					{
						"id":4,
						"x": 67,
						"y":32
					},
					{
						"id":5,
						"x":89,
						"y":5
					}
				]
			}
		]
	},
	{
		"duration":13,
		"polygon":[
			{
				"id":2,
				"elementId":1,
				"visible":true,
				"points":[
					{
						"id":1,
						"x": 100,
						"y":100
					},
					{
						"id":2,
						"x": 1,
						"y":60
					},
					{
						"id":3,
						"x": 20,
						"y":60
					},
					{
						"id":4,
						"x": 20,
						"y":70
					}
				]
			},
			{
				"id":12,
				"color":"blue",
				"elementId":1,
				"visible":true,
				"points":[
					{
						"id":1,
						"x": 100,
						"y":3
					},
					{
						"id":2,
						"x": 76,
						"y":60
					},
					{
						"id":3,
						"x": 20,
						"y":60
					}
				]
			},
			{
				"id":23,
				"color":"blue",
				"elementId":1,
				"visible":true,
				"points":[
					{
						"id":1,
						"x": 100,
						"y":3
					},
					{
						"id":2,
						"x": 76,
						"y":60
					},
					{
						"id":3,
						"x": 20,
						"y":60
					}
				]
			},
			{
				"id":3,
				"elementId":1,
				"visible":true,
				"points":[
					{
						"id":1,
						"x": 100,
						"y":100
					},
					{
						"id":2,
						"x": 22,
						"y":60
					},
					{
						"id":3,
						"x": 20,
						"y":1
					},
					{
						"id":4,
						"x": 67,
						"y":32
					},
					{
						"id":5,
						"x":89,
						"y":5
					}
				]
			}
		]
	},
	{
		"duration":22,
		"polygon":[
			{
				"id":2,
				"elementId":1,
				"visible":true,
				"points":[
					{
						"id":1,
						"x": 100,
						"y":100
					},
					{
						"id":2,
						"x": 1,
						"y":60
					},
					{
						"id":3,
						"x": 20,
						"y":60
					},
					{
						"id":4,
						"x": 20,
						"y":70
					}
				]
			},
			{
				"id":12,
				"color":"blue",
				"elementId":1,
				"visible":true,
				"points":[
					{
						"id":1,
						"x": 100,
						"y":3
					},
					{
						"id":2,
						"x": 76,
						"y":60
					},
					{
						"id":3,
						"x": 20,
						"y":60
					}
				]
			},
			{
				"id":23,
				"color":"blue",
				"elementId":1,
				"visible":true,
				"points":[
					{
						"id":1,
						"x": 100,
						"y":3
					},
					{
						"id":2,
						"x": 76,
						"y":60
					},
					{
						"id":3,
						"x": 20,
						"y":60
					}
				]
			},
			{
				"id":3,
				"elementId":1,
				"visible":true,
				"points":[
					{
						"id":1,
						"x": 100,
						"y":1
					},
					{
						"id":2,
						"x": 22,
						"y":60
					},
					{
						"id":3,
						"x": 20,
						"y":1
					},
					{
						"id":4,
						"x": 67,
						"y":32
					},
					{
						"id":5,
						"x":89,
						"y":5
					}
				]
			}
		]
	}
];


	 var video1 = new Klik('.klik','','400px','');
	 video1.createVideo();
	 var layer = video1.addGraphicLayer();

	 layer.adaptToVideo();
	 layer.dynamise(data);

	 // video1.controlsTemplate('<div><h1>yeaaah</h1></div>');
	 
	 console.log($(plyrControls));
	 video1.setControls(plyrControls);

	 $('#'+layer.id+' path').on('mouseover',function(){
	 	console.log('yeaaaah');
	 })
	 
	 var polygones = [];
	 $('#newPolygon').on('click', function(){
	 	var polygone1 = layer.newPolygon();
	 	polygones.push(polygone1);
	 	$('#' + layer.id).children('svg').on('click', function(e){
		 	var pointPos = {
	    		"x": e.offsetX,
		      	"y": e.offsetY
	    	}
		 	var points = polygone1.addPoint(pointPos);
		 	

		 });

	 	$('#' + layer.id).children('svg').on('dblclick', function(e){
	 		var pointPos = {
	    		"x": e.offsetX,
		      	"y": e.offsetY
	    	}
	 		var points = polygone1.addPoint(pointPos);
	 		polygone1.stop();
	 	});
	 	$('.' + polygone1.polyClass).on('click', function(){
	 		console.log('clicked');
	 	})
	 	$('#updatePolygon').on('click', function(){
	 		polygone1.update();
	 	});

	 	$(window).on('resize', function(){
	 		// polygone1.update();
	 		console.log(polygones);
	 		layer.updateToScreen();
	 		console.log('fjod')
	 		for (var i = polygones.length - 1; i >= 0; i--) {
	 			polygones[i].update();
	 			console.log(i)
	 		};
	 	})


	 });

	 $('#update').on('click', function(){
	 	console.log(polygones);
	 	layer.update();
	 })


	 // var flo = new Klik('.flo', '60%', '300px', '');
	 // var couche1 = flo.addLayer();

	 // couche1.stylise({
 	// 	'background-color':'blue',
 	// 	'opacity':'0.5'
	 // })

	 // couche1.adaptToVideo();
	 
	
	 
	 // var layerOuzbek = ouzbek.addLayer();
	 // $(video1.videoDom).on('timeupdate', function(){
	 // 	video1.getVideoTime();
	 // })
	 layer.stylise({
	 	'background-color':'',
	 	'opacity': '0.3'
	 });

	 // layerOuzbek.stylise({
	 // 	'background-color':'blue',
	 // 	'opacity':'0.5'
	 // })
	 // layerOuzbek.adaptToVideo();

	 // layer.adaptToVideo();


	 // coucheGIOM.stylise({
	 // 	'background-color':'green',
	 // 	'opacity': '0.4',
	 // 	'width': '100%',
	 // 	'position': 'right'
	 // });

	 // layer2.stylise({
	 // 	'background-color':'red',
	 // 	'opacity': '0.4',
	 // 	'width': '20%',
	 // 	'position': 'right'
	 // });

	 //  layer3.stylise({
	 // 	'background-color':'blue',
	 // 	'opacity': '0.1',
	 // 	'width':'60%'
	 // });
	 //  layer3.adaptToVideo();
	  $(window).on('resize', function(){
			console.log('dsadsad')
	 		layer.adaptToVideo();
	 		layer.updateToScreen(); 		
	  });
	 //  video1.setControlsTemplate();
	 //  video1.setControls();
	 //  ouzbek.setControls();
	  
	  

// cat1 = new cat("felix")
// cat1.talk() //alerts "felix says meeow!"
 
// cat2 = new cat("ginger")
// cat2.talk() //alerts "ginger says meeow!"
// cat2.talk() //alerts "ginger says meeow!"

// firstCat = new cat("pursur")
// var caty = firstCat.changeName('Matt');
// var caty2 = firstCat.changeName('Yep');
// caty.talk();
// caty2.talk();
// caty2.changeName('supra');
// caty2.talk();
// caty.talk();

// var baby = caty.newBaby(3);
// console.log(baby);
// var baby2 = caty2.newBaby(5);
// console.log(baby2)
 //alerts "Bill says meeow!"

	  // console.log(layer1.layer.selector);
	  // console.log(layer2.layer);
	  // console.log(layer3.layer);
	 // layer2.styliseLayer('red', 0.4);
	 // layer3.styliseLayer('green', 0.4);
	 // layer2.adaptLayerToVideo();
	 
$('path').on('click', function(){
	console.log('clicccck');
})


})