(function () {
    'use strict';

    angular
        .module('crimsonSingles')
        .controller('LoginController', LoginController);

    /** @ngInject */
    function LoginController($firebaseAuth, FIREBASE_URL, $state, $uibModal) {
        var vm = this;
        var fbRef = new Firebase(FIREBASE_URL);
        var auth = $firebaseAuth(fbRef);
        
        vm.loadingLogin = false;
        vm.loadingRegister = false;
        vm.performLogin = function () {
            vm.loadingLogin = true;
            vm.authData = null;
            vm.error = null;

            auth.$authWithPassword({
                email: vm.email,
                password: vm.password
            }).then(function (authData) {
                vm.authData = authData;
                vm.loadingLogin = false;
                if (authData.password.isTemporaryPassword) {
                    $state.go('home.account');
                } else {
                    $state.go('home');
                }
            }).catch(function () {
                $uibModal.open({
                    templateUrl: 'app/login/invalid-credentials.modal.html'
                });
                vm.loadingLogin = false;
            });
        };

        vm.registerUser = function() {
            vm.loadingRegister = true;
            auth.$createUser({
                email: vm.email,
                password: vm.password
            }).then(function(userdata) {
                vm.authData = userdata;
                vm.performLogin();
                vm.loadingRegister = false;
            }).catch(function() {
                $uibModal.open({
                    templateUrl: 'app/login/registration-error.modal.html'
                });
                vm.loadingRegister = false;
            });
        };
    }
})();
