(function () {
    'use strict';

    angular
        .module('crimsonSingles')
        .controller('AccountController', AccountController);

    /** @ngInject */
    function AccountController(FBAuth, modalAlert, $log, $scope, userProfile) {
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
                  modalAlert("Password Changed!", "Your password has been succesfully changed. If you forget it, I'm going to be forced to send Shaxx over to deal with you.");
                  vm.oldPassword = '';
                  vm.newPassword = '';
                  vm.changePasswordLoading = false;
              }).catch(function(error) {
                  modalAlert("Password Reset Error", "Whoops! We were unable to reset your password. Can you double check you entered your OLD password correctly?<");
                  $log.debug(error);
                  vm.oldPassword = '';
                  vm.newPassword = '';
                  vm.changePasswordLoading = false;
              });
        };
    }
})();
