(function() {
  'use strict';

  angular
    .module('deepomatic.detector')
    .controller('DetectorController', DetectorController);

  /* @ngInject */
  function DetectorController(Upload, $http, $interval) {
    // Reference to this controller
    var vm = this;

    /// Attributes
    ///////

    vm.detectButtonDisable = true;
    vm.overlay = false;

    vm.choice = 'fashion';
    vm.currentTaskId = '';
    vm.picture = '';
    vm.urlInputValue = '';
    vm.boxes = [];
    vm.detectInterval = false;
    vm.check = 0;

    /// Public Methods
    ///////

    vm.detect = detect;
    vm.upload = upload;
    vm.urlInput = urlInput;
    vm.reset = reset;

    function reset() {
      vm.choice = 'fashion';
      vm.currentTaskId = '';
      vm.urlInputValue = '';
      vm.detectInterval = false;
      vm.detectButtonDisable = true;
      vm.boxes = [];
      vm.picture = '';
      vm.overlay = false;
    }

    function detect() { console.log('detect()', arguments);
      detectByUrl(vm.urlInputValue);
    }

    function upload(file) {
      Upload.base64DataUrl(file).then(function(fileBase64) {
        vm.picture = fileBase64;
        validData();
      });
    }

    function urlInput() { console.log('urlInput()', arguments);
      validData();
    }

    function validateUrl(value) {
      return /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(value);
    }

    function detectByUrl(url) {
      vm.check = 0;

      $http.get('/api/detect/weapons/?url=' + url)
        .then(function(response) {
          if (typeof response.data.task_id === 'string') {
            vm.currentTaskId = response.data.task_id;
            vm.detectInterval = $interval(checkTask, 1000);
          } else {

          }
        });
    }

    function checkTask() {
      $http.get('/api/tasks/' + vm.currentTaskId)
        .then(function(response) {
          if (typeof response.data.task.data === 'object' && typeof response.data.task.data.boxes === 'object') {
            vm.boxes = response.data.task.data.boxes;
            $interval.cancel(vm.detectInterval);
            return;
          }
        });
    }

    function validData() {
      if (vm.picture.length) {
        vm.detectButtonDisable = false;
        vm.overlay = true;
      } else if (vm.urlInputValue.length && validateUrl(vm.urlInputValue)) {
        vm.detectButtonDisable = false;
        vm.picture = vm.urlInputValue;
        vm.overlay = true;
      } else {
        vm.detectButtonDisable = true;
        vm.overlay = false;
      }
    }
  }
})();
