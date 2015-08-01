'use strict';

angular.module('msrsApp')
  .controller('VideoCtrl', function ($scope, $stateParams) {
    
    $scope.videoId = $stateParams.videoId;
    $scope.videoIframeLink = ' <iframe src="http://localhost:9000/video/' + $scope.videoId + '" width="100%" height="100%" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>'


  });
