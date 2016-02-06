(function() {
  'use strict';

  angular
    .module('crimsonSingles')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($timeout, webDevTec, toastr, $firebaseObject) {
    var vm = this;
    var fbRef = new Firebase("https://blinding-heat-3514.firebaseio.com");
    vm.firebase = $firebaseObject(fbRef);
    vm.testData = [{name:"Test1"},{name:"Test2"}];
  }
})();
