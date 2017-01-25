(function() {
  'use strict';

  angular
    .module('deepomatic.detector')
    .directive('boxDetail', boxDetail);

  /* @ngInject */
  function boxDetail() {
    var directive = {
      restrict: 'A',
      template: 'Test {{scope.message}}',
      link: linkFunc,
    };

    return directive;

    function linkFunc(scope, el, attr, ctrl) {
      scope.message = 'Hello';
    }
  }
})();
