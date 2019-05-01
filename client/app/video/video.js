'use strict';

angular.module('msrsApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('video', {
        url: '/video/:videoId',
        templateUrl: 'app/video/video.html',
        controller: 'VideoCtrl'
      });
  });