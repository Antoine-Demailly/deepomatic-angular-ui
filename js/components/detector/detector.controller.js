(function() {
  'use strict';

  angular
    .module('deepomatic.detector')
    .controller('DetectorController', DetectorController);

  /* @ngInject */
  function DetectorController(Upload, $http, $interval, detectorService) {
    // Reference to this controller
    var vm = this;

    /// Attributes
    ///////

    vm.boxes               = {};
    vm.check               = 0;
    vm.choice              = 'fashion';
    vm.currentTaskId       = '';
    vm.detectButtonDisable = true;
    vm.detectInterval      = false;
    vm.errorMessage        = '';
    vm.isDetect            = false;
    vm.loaderMessage       = '';
    vm.overlay             = false;
    vm.picture             = '';
    vm.urlInputValue       = '';
    vm.validInput          = true;

    /// Public Methods
    ///////

    vm.detect     = detect;
    vm.emptyBoxes = emptyBoxes;
    vm.reset      = reset;
    vm.upload     = upload;
    vm.urlInput   = urlInput;

    function detect() {
      if (vm.urlInputValue.length && vm.validInput) {
        detectByUrl(vm.urlInputValue);
      } else {
        detectByUpload();
      }
    }

    function emptyBoxes() {
      return Object.keys(vm.boxes).length == 0;
    }

    function reset() {
      vm.choice = 'fashion';
      vm.currentTaskId = '';
      vm.urlInputValue = '';
      vm.validInput = true;
      vm.detectInterval = false;
      vm.detectButtonDisable = true;
      vm.boxes = {};
      vm.picture = '';
      vm.errorMessage = '';
      vm.overlay = false;
      vm.isDetect = false;
    }

    function upload(file) {
      Upload.base64DataUrl(file).then(function(fileBase64) {
        vm.picture = fileBase64;
        validData();
      });
    }

    function urlInput() {
      validData();
    }

    /// Private Methods
    ///////

    function checkTask() {
      detectorService.checkTask(vm.currentTaskId, function(response) {
        if (response.data.task.status == 'success' && response.data.task.data != null && typeof response.data.task.data.boxes === 'object') {
          vm.boxes = response.data.task.data.boxes;
          vm.isDetect = true;
          resetLoader();
          $interval.cancel(vm.detectInterval);
          return;
        } else if (response.data.task.status == 'pending') {
          // Do nothing
        } else if (response.data.task.status == 'error') {
          vm.errorMessage = response.data.task.error + ' Please try with a direct link.';
          resetLoader();
          $interval.cancel(vm.detectInterval);
          return;
        } else {
          vm.errorMessage = 'Detection fail';
          $interval.cancel(vm.detectInterval);
        }
      });
    }

    function detectByUrl(url) {
      vm.loaderMessage = 'Image detection';

      detectorService.getDetect(url, vm.choice, function(response) {
        if (typeof response.data.task_id === 'string') {
          vm.currentTaskId = response.data.task_id;
          vm.detectInterval = $interval(checkTask, 1000);
        } else {
          vm.errorMessage = 'You probably send a bad link.';
        }
      });
    }

    function detectByUpload() {
      vm.loaderMessage = 'Upload image';

      detectorService.postDetect(vm.picture, vm.choice,
        function onSuccess(resp) {
          if (typeof resp.data.task_id === 'string') {
            vm.loaderMessage = 'Image detection';
            vm.currentTaskId = resp.data.task_id;
            vm.detectInterval = $interval(checkTask, 1000);
          } else {
            resetLoader();
            vm.errorMessage = 'Error during image upload.';
          }
        }, function onError(resp) {
          resetLoader();
          vm.errorMessage = 'Error during image upload.';
        });
    }

    function resetLoader() {
      vm.loaderMessage = '';
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

    function validateUrl(value) {
      var valid = /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(value);
      valid = value.endsWith('.jpg') || value.endsWith('.png') || value.endsWith('.bmp') ? valid : false;

      vm.validInput = valid;

      return valid;
    }
  }
})();
