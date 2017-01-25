(function() {
  'use strict';

  angular
    .module('deepomatic.detector')
    .directive('box', box);

  /* @ngInject */
  function box($rootScope, $timeout) {
    var directive = {
      restrict: 'A',
      link: linkFunc,
      scope: {
        positions: '=',
        type: '@'
      }
    };

    return directive;

    function linkFunc(scope, el, attr) {
      scope.uid = guid();

      $rootScope.$on('receiveOffsetInit-' + scope.uid, calcBox);
      $rootScope.$on('receiveOffsetResize', calcBox);
      $rootScope.$broadcast('newBox', scope.uid);

      function calcBox(e, offset) {
        var left = offset.left + Math.round(scope.positions.xmin * offset.width);
        var top  = offset.top + Math.round(scope.positions.ymin * offset.height);
        var width = Math.round((scope.positions.xmax - scope.positions.xmin) * offset.width);
        var height = Math.round((scope.positions.ymax - scope.positions.ymin) * offset.height);

        var css = {
          left: left + 'px',
          top: top + 'px',
          width: width + 'px',
          height: height + 'px'
        };

        el.css(css);

        $timeout(function() {
          el.addClass('visible');
        }, 10);
      }

      function guid() {
        function s4() {
          return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
          s4() + '-' + s4() + s4() + s4();
      }
    }
  }
})();
