'use strict';

angular.module('msrsApp')
  .controller('VideosCtrl', function ($scope, $http) {
    $scope.message = 'Hello';
    $http({
    	method: 'GET',
    	url: '/api/projects'
    }).success(function(projects){
    	console.log(projects);
    	$scope.videoProjects = projects;
    }).error(function(err){
    	console.log(err);
    })

  });
