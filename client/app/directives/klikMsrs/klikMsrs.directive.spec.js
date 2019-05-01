'use strict';

describe('Directive: klikMsrs', function () {

  // load the directive's module and view
  beforeEach(module('msrsApp'));
  beforeEach(module('app/directives/klikMsrs/klikMsrs.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<klik-msrs></klik-msrs>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the klikMsrs directive');
  }));
});