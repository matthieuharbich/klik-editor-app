'use strict';

angular.module('msrsApp')
  .factory('EditorFactory', function($window, $http) {

      return{


      getMainEditorHeight: function(callback) {
          var fullHeight = $window.innerHeight;
          var editorHeight = fullHeight - 100;
          var mainEditorHeight = 0.5 * editorHeight;
          
          callback(mainEditorHeight);
      },

      getVideoEditorWidth: function(callback){
          var videoEditorWidth = angular.element(document.getElementById('videoEditor')).innerWidth();

          callback(videoEditorWidth);
      },

      getFullHeight: function(callback){
          var fullHeight= $window.innerHeight;

          callback(fullHeight);
      },



      getTimelineEditorHeight: function(callback) {
          var fullHeight = $window.innerHeight;
          var editorHeight = fullHeight - 100;
          var timelineEditorHeight = 0.5 * editorHeight;
          
          callback(timelineEditorHeight);
      },

      getElements: function(projectId, callback){
        $http({
            method: 'GET',
            url: 'api/projects/'+projectId
          }).success(function(project) {

           var elements = project._elements;
           callback(null, elements);

          }).error(function(err) {
            callback(err);
            
            
          });
      },

      getDurations: function(projectId, callback){
        $http({
          method: 'GET',
          url: 'api/projects/' + projectId
        }).success(function(project){
          var durations = project.klikData;
          callback(null, durations);
        }).error(function(err){
          callback(err);
        })
      },

      getPolygon: function(durationId, callback){
        var polys = [];
        $http({
          method:'GET',
          url: 'api/durations/' + durationId
        }).success(function(duration){
          for (var i = duration.polygon.length - 1; i >= 0; i--) {
            polys.push(duration.polygon[i])
          };
          callback(null, polys)
        })
      },

      postElement: function(data, callback) {
          $http({
              method: 'POST',
              url: 'api/elements',
              data: data
            }).success(function(element) {

             
             callback(null, element);

            }).error(function(err) {
              callback(err);
              
              
            });
      }    

    };   

  })

  .controller('EditorCtrl', function ( EditorFactory, $state, $window, $http, $scope, $stateParams,ngDialog, $sce) {

    $scope.activeElementName = '';
    $scope.activeElementObject = null;
    $scope.elements = [];
    $scope.isElementActive = true;
    $scope.editorCurrentTime = '0:00.00'
    $scope.edition = true;
    $scope.selected = -1;
  	var projectId = $stateParams.projectId;
    $scope.ptsPoly = [];
    $scope.polygons = []; 
    $scope.hashEditor = [];
    var video = angular.element('.klikEditor');

    $scope.videoDuration = video[0].duration;

    EditorFactory.getElements(projectId, function(err,elements){
      if (err) {
        alert(err);
      }else{
        $scope.elements = elements;
      };
    })

    EditorFactory.getDurations(projectId, function(err, durations){
      if(err){
        alert(err);
      }else{
        $scope.durations = durations;
        for (var i = durations.length - 1; i >= 0; i--) {
          $scope.hashEditor[durations[i].duration] = durations[i].polygon;
          
        };

      }
    })     


    video[0].addEventListener('loadedmetadata', function() {
     $scope.videoDuration = this.duration;

    });
    $scope.curT = 0;
    video.on('timeupdate',function(){
      
      $scope.$apply(function() {
          var currentTime = video[0].currentTime;
          $scope.curT = currentTime;
          var hrs = ~~(currentTime / 3600);
          var mins = ~~((currentTime % 3600) / 60);
          var secs =  (currentTime % 60).toFixed(2);
          var ret = "";
          if (hrs > 0)
              ret += "" + hrs + ":" + (mins < 10 ? "0" : "");

          ret += "" + mins + ":" + (secs < 10 ? "0" : "");
          ret += "" + secs
          $scope.editorCurrentTime = ret;
       });

    })

    $http.get('/api/projects/' + projectId).success(function(project){
    	$scope.project = project;   
      $scope.klikData = project.klik;
    });

    function videoEditorHeight(){
      EditorFactory.getFullHeight(function(height){
        
        var resizableVideoHeight = '' + height +'px';
        $scope.videoHeight = resizableVideoHeight;
      });
    }

    EditorFactory.getVideoEditorWidth(function(width){
     
    })



    $scope.togglePreview = function(){
      if ($scope.edition) {
        $scope.edition = false;
      } else{
        $scope.edition = true;
      };
      
    }

    $scope.postPolygon = function(){

      var duration = Math.floor($scope.curT * 4) / 4;
      var dataPoly = {
          id: 1,
          element:  $scope.activeElementObject._id,
          visible: true,
          points: $scope.ptsPoly
        }
        $http({
              method: 'POST',
              url: 'api/polygons',
              data: dataPoly
            }).success(function(polygon) {
               $scope.polygons.push(polygon);

               
               
               var durationData = {
                  duration: duration,
                  polygon: [polygon]
               }

               if ($scope.hashEditor.hasOwnProperty(duration)) {
                  $http({
                    method: 'PUT',
                    url: 'api/projects/'+ $scope.project._id+'?duration='+duration,
                    data:  polygon
                  }).success(function(duration){

                  }).error(function(err){

                  })
               }else{
                $http({
                    method: 'POST',
                    url: 'api/durations',
                    data: durationData
                   }).success(function(duration){

                      $http({
                        method: 'PUT',
                        url:'api/projects/' + $scope.project._id,
                        data: duration
                      }).success(function(project){

                      }).error(function(err){

                      })
                      
                                

                 }).error(function(err){

                 })
                 $scope.ptsPoly = [];

               };

               if(typeof $scope.hashEditor[duration] == 'undefined'){
                $scope.hashEditor[duration] = [];
               };
                $scope.hashEditor[duration].push(polygon);
               


            }).error(function(err) {

              
              
            });
    }

    $scope.postPoint = function(pos){

      var data = {
        x :pos.x,
        y:pos.y
      }
        $http({
              method: 'POST',
              url: 'api/points',
              data: data
            }).success(function(point) {

             $scope.ptsPoly.push(point);

             

            }).error(function(err) {

              
              
            });
    }

    $scope.activeElement = function(index){
      $scope.selected = index; 

      $scope.activeElementName = this.element.name;
      $scope.activeElementObject = this.element;
      $scope.isElementActive = false;
     

      
      
    }

    $scope.openElementModal = function(element){

      ngDialog.open({
              template: 'app/modal/elementMetadata.html',
              className: 'ngdialog-theme-default',
              data: element,
              controller: 'EditorCtrl',
              closeByEscape: true,
              closeByDocument: true,
              showClose: true
            });
    }

    $scope.updateElement = function(name, title, description, price, id){
      $scope.elementToUpdate = {}
      $scope.elementToUpdate.name = name;
      $scope.elementToUpdate.title = title;
      $scope.elementToUpdate.description = description;
      $scope.elementToUpdate.price = price;
      $scope.elementToUpdate.id = id;

      $http({
        method: 'PUT',
        url:'api/elements/'+$scope.elementToUpdate.id,
        data: $scope.elementToUpdate
      }).success(function(element){

      }).error(function(err){

      })

    }

    $scope.postElement = function(name, e, action, projectId){
        var element = {
          name: name,
          triggerEvent: e,
          dataAction: action,
          info: '',
          projectId: projectId
        }
        EditorFactory.postElement(element, function(err, element){
            if (err) {
              alert(err);
            }else{              
              $scope.elements.push(element);
            };
        })
    }

    $scope.removeElement = function(projectId, id){
      $http({
            method: 'DELETE',
            url: 'api/elements/'+id
          }).success(function() {
            $scope.activeElementName = '';
            $scope.selected = -1;
            $scope.activeElementObject = null;
             EditorFactory.getElements(projectId, function(err,elements){
              if (err) {
                alert(err);
              }else{
                $scope.elements = elements;
              };
            })

          }).error(function(err) {
            alert(err);       
            
        });
    }


    function editorHeights() {
      
      EditorFactory.getMainEditorHeight(function(height){        

          $scope.mainEditorStyle = {};
          $scope.mainEditorStyle.height = {};
          var mainEditorHeight = '' + height +'px';   
          var bottomMain = '' + (height + 6) +'px';   
          $scope.mainBottom = bottomMain;       
          $scope.mainEditorStyle.height = mainEditorHeight;          
          
      });

      EditorFactory.getTimelineEditorHeight(function(height){
      
      	 $scope.resizerStyle = {};
          var timelineEditorHeight = '' + height +'px';
          var resizerStyleBottom = '' + height +'px';
          $scope.timelineEditorStyle = {
            'height' : timelineEditorHeight
          };

          $scope.resizerStyle = resizerStyleBottom;
           


      });   
  }

  
      editorHeights();
    // videoEditorWidth();
    videoEditorHeight();  
     
    
    

  })
   .controller('heightCtrl', function (HomeFactory, $window, $scope,musicController,$ionicPlatform) {



            

            $scope.height = ($window.innerHeight + 3) / 3;

            $scope.heightStyle = '' + $scope.height + 'px';

           


            $scope.myStyle = {
                'height': $scope.heightStyle
            };
            
            
      



      $scope.myStyle = {
		    'height' : $scope.heightStyle
		  };
        $scope.myStyleScore = {
        'height' : $scope.heightStyle,
        'line-height': $scope.heightStyle
        };


        })

  	.controller('SocketTestCtrl', function($state, $http, $scope, $stateParams, socket){

  		 var projectId = $stateParams.projectId;

		    $http.get('/api/projects/' + projectId).success(function(project) {
		      $scope.project = project;
		      $scope.word = project.number;
		      socket.syncUpdates('word', $scope.word);
		    });

		    

		   

		    $scope.change = function(newWord){
		    
		    	$scope.word = newWord;

		    	$http.put('/api/projects/' + projectId, { number: $scope.word });
		      	$scope.word = '';
		    };

		    $scope.addThing = function() {
		      if($scope.newThing === '') {
		        return;
		      }
		      $http.post('/api/things', { name: $scope.newThing });
		      $scope.newThing = '';
		    };

		    $scope.deleteThing = function(thing) {
		      $http.delete('/api/things/' + thing._id);
		    };

		    $scope.$on('$destroy', function () {
		      socket.unsyncUpdates('thing');
		    });

});
