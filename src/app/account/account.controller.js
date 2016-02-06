(function () {
    'use strict';

    angular
        .module('crimsonSingles')
        .controller('AccountController', AccountController);

    /** @ngInject */
    function AccountController(FBAuth, $uibModal, $log) {
        var vm = this;

        vm.changePassword = function() {
              FBAuth.$changePassword({
                  email: '',
                  oldPassword: vm.oldPassword,
                  newPassword: vm.newPassword
              }).then(function() {
                  $uibModal.open({
                      templateUrl: 'app/account/password-changed.modal.html'
                  });
                  vm.oldPassword = '';
                  vm.newPassword = '';
              }).catch(function(error) {
                  $uibModal.open({
                     templateUrl: 'app/account/password-change-failed.modal.html'
                  });
                  $log.debug(error);
                  vm.oldPassword = '';
                  vm.newPassword = '';
              });
        };
    }
})();
