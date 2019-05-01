'use strict';

describe('Directive: resizable', function () {

  // load the directive's module and view
  beforeEach(module('msrsApp'));
  beforeEach(module('app/resizable/resizable.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<resizable></resizable>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the resizable directive');
  }));
});