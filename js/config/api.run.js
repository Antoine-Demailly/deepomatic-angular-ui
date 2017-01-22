(function() {
  'use strict';

  angular
    .module('deepomatic')
    .run(APIRun);

  /* @ngInject */
  function APIRun(DeepomaticAPI) {
    DeepomaticAPI.getTokens();
  }
})();
