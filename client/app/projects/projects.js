'use strict';

angular.module('msrsApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('projects', {
        url: '/',
        templateUrl: 'app/projects/projects.html',
        controller: 'ProjectsCtrl',
        authenticate: true
      });
  });