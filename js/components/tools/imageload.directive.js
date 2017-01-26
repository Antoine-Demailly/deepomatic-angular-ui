(function() {
  'use strict';

  angular
    .module('deepomatic.tools')
    .directive('imageLoad', imageLoad);

  /* @ngInject */
  function imageLoad($rootScope, $window) {
    var directive = {
      restrict: 'A',
      link: linkFunc,
      scope: {
        picture: '=',
      },
      width: null,
      height: null
    };

    return directive;

    function linkFunc(scope, el, attr, ctrl) {
      scope.offset = {};

      scope.$watch('picture', function(newValue, oldValue) {
        if (newValue == '') {
          el.removeClass('loaded');
        }
      });

      $rootScope.$on('newBox', function(e, uid) {
        $rootScope.$broadcast('receiveOffsetInit-' + uid, scope.offset);
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

      angular.element($window).bind('resize', function() {
        var change = false;

        var left = el[0].offsetLeft;
        if (scope.offset.left != left) {
          scope.offset.left = left;
          change = true;
        }

        var top = el[0].offsetTop;
        if (scope.offset.top != top) {
          scope.offset.top = top;
          change = true;
        }

        var width = el[0].offsetWidth;
        if (scope.offset.width != width) {
          scope.offset.width = width;
          change = true;
        }

        var height = el[0].offsetHeight;
        if (scope.offset.height != height) {
          scope.offset.height = height;
          change = true;
        }

        if (change == true) {
          $rootScope.$broadcast('receiveOffsetResize', scope.offset);
        }

        scope.$digest();
      });
    }
  }
})();
