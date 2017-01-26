(function() {
  'use strict';

  angular
    .module('deepomatic.detector')
    .service('detectorService', detectorService);

  /* @ngInject */
  function detectorService(Upload, $http, $interval) {

    // Reference to this controller
    var vm = this;

    /// Public Methods
    ///////

    vm.getDetect = getDetect;
    vm.postDetect = postDetect;

    function getDetect(url) {

    }

    function postDetect(picture, success, error) {

    }
  }
})();
