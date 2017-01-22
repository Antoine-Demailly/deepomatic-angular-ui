(function() {
  'use strict';

  angular
    .module('deepomatic.api')
    .factory('DeepomaticAPI', DeepomaticAPI);

  /* @ngInject */
  function DeepomaticAPI($http) {
    var factory = {
      tokens: false,
      getTokens: getTokens,
    };

    return factory;

    function getTokens() {
      $http({url: 'api.json'})
        .then(function(response) {
          console.log(response.data);
        });
    }
  }
})();
