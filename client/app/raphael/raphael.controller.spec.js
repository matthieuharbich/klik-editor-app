'use strict';

describe('Controller: RaphaelCtrl', function () {

  // load the controller's module
  beforeEach(module('msrsApp'));

  var RaphaelCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RaphaelCtrl = $controller('RaphaelCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
