(function() {
  'use strict';

  angular
    .module('deepomatic-test.layout')
    .controller('LayoutController', LayoutController);

  /* @ngInject */
  function LayoutController() {

    // Reference to this controller
    var vm = this;

    /// Attributes
    ///////

    vm.attribute = '';

    /// Public Methods
    ///////

    vm.example = example;

    function example() {

    }

    /// Private Methods
    ///////

    function examplePrivate() {

    }
  }
})();
