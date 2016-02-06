(function() {
  'use strict';

  angular
    .module('crimsonSingles')
    .directive('navbar', navbar);

  /** @ngInject */
  function navbar() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/navbar/navbar.html',
      controller: NavbarController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function NavbarController() {
      var vm = this;
      vm.title = "Crimson Singles";
      vm.navbarCollapsed = false;
    }
  }

})();
