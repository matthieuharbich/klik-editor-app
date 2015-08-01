'use strict';

angular.module('msrsApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('raphael', {
        url: '/raphael',
        templateUrl: 'app/raphael/raphael.html',
        controller: 'RaphaelCtrl'
      });
  });