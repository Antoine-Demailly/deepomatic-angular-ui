(function() {
  'use strict';

  angular
    .module('deepomatic.detector')
    .service('detectorService', detectorService);

  /* @ngInject */
  function detectorService(Upload, $http) {

    // Reference to this controller
    var vm = this;

    /// Public Methods
    ///////

    vm.checkTask  = checkTask;
    vm.getDetect  = getDetect;
    vm.postDetect = postDetect;

    function getDetect(url, choice, callback) {
      $http.get('/api/detect/' + choice + '/?url=' + url).then(callback);
    }

    function postDetect(picture, choice, success, error) {
      var body = {
        base64: picture.replace(/data:image\/[a-zA-Z]*;base64,/g, '')
      };

      Upload.upload({
          url: '/api/detect/' + choice,
          data: body
        }).then(success, error);
    }

    function checkTask(taskId, callback) {
      $http.get('/api/tasks/' + taskId).then(callback);
    }
  }
})();
