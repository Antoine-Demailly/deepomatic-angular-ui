(function() {
  'use strict';

  angular
    .module('deepomatic.detector')
    .directive('box', box);

  /* @ngInject */
  function box($rootScope) {
    var directive = {
      restrict: 'A',
      link: linkFunc,
    };

    return directive;

    function linkFunc(scope, el) {
      $rootScope.$broadcast('newBox');

      $rootScope.$on('receiveOffset', function(e, offset) {
        console.log('offset', offset);
      });
    }
  }
})();
