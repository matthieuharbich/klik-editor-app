'use strict';

angular.module('msrsApp')
  .directive('klikmsrs', function ($timeout, $http) {
    return {
      restrict: 'EA',
      link: function (scope, element, attrs) {
        $timeout(function(){
            var klik = new Klik('.'+attrs.class);
            var polyLayer = klik.addGraphicLayer();
            polyLayer.stylise({
              'background-color': '',
              'opacity': 0.2
            })
            polyLayer.adaptToVideo();
            $(window).on('resize', function(){
              polyLayer.adaptToVideo();
            })
            $http({
              method:'GET',
              url: 'api/projects/' + attrs.dataid
            }).success(function(project){
              var klikData = project.klikData;
              console.log(attrs.dataid)
              console.log(klikData)
              polyLayer.dynamise(klikData)
            }).error(function(err){
              console.log(err);
            })
          // klik.setControls();
        }); 
          
          
    
        	
      }
    };
  });