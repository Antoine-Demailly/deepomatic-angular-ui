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
      scope: {
        positions: '=',
      }
    };

    return directive;

    function linkFunc(scope, el) {
      console.log('positions', scope.positions);

      $rootScope.$broadcast('newBox');

      $rootScope.$on('receiveOffset', function(e, offset) {
        console.log('offset', offset);
      });

    }
  }
})();
