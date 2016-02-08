(function () {
    'use strict';

    angular
        .module('crimsonSingles')
        .controller('AccountController', AccountController);

    /** @ngInject */
    function AccountController(FBAuth, $uibModal, $log, $scope, userProfile) {
        var vm = this;
        userProfile.$bindTo($scope, 'profile');
        vm.saveNetworkIds = function() {
            
        };
        
        vm.changePasswordLoading = false;
        vm.changePassword = function() {
            vm.changePasswordLoading = true;
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
                  vm.changePasswordLoading = false;
              }).catch(function(error) {
                  $uibModal.open({
                     templateUrl: 'app/account/password-change-failed.modal.html'
                  });
                  $log.debug(error);
                  vm.oldPassword = '';
                  vm.newPassword = '';
                  vm.changePasswordLoading = false;
              });
        };
    }
})();
