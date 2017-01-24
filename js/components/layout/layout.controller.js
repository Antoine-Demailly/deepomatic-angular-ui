(function() {
  'use strict';

  angular
    .module('deepomatic.layout')
    .controller('LayoutController', LayoutController);

  /* @ngInject */
  function LayoutController(Upload) {
    // Reference to this controller
    var vm = this;

    /// Attributes
    ///////

    vm.detectButtonDisable = true;

    vm.picture = '';
    vm.boxes = [];

    /// Public Methods
    ///////

    vm.detect = detect;
    vm.upload = upload;

    function detect() {
      console.log('Detect');
    }

    function upload(file) {
      Upload.base64DataUrl(file).then(function(fileBase64) {
        vm.picture = fileBase64;
      });
    }
  }
})();
