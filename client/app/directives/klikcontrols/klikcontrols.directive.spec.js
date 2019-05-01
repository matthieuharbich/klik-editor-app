'use strict';

describe('Directive: klikcontrols', function () {

  // load the directive's module
  beforeEach(module('msrsApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<klikcontrols></klikcontrols>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the klikcontrols directive');
  }));
});