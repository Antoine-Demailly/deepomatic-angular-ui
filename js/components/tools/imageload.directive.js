(function() {
  'use strict';

  angular
    .module('deepomatic.tools')
    .directive('imageLoad', imageLoad);

  /* @ngInject */
  function imageLoad($rootScope) {
    var directive = {
      restrict: 'A',
      link: linkFunc,
      scope: {},
      width: null,
      height: null
    };

    return directive;

    function linkFunc(scope, el, attr, ctrl) {
      scope.offset = {};

      $rootScope.$on('newBox', function(e) {
        $rootScope.$broadcast('receiveOffset', scope.offset);
      });

      el.on('load', function(e) {
        scope.offset = {
          left: el[0].offsetLeft,
          width: el[0].offsetWidth,
          top: el[0].offsetTop,
          height: el[0].offsetHeight,
        };

        el.addClass('loaded');
      });
    }
  }
})();
