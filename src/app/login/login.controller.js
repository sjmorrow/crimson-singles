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

        vm.performLogin = function () {
            vm.authData = null;
            vm.error = null;

            auth.$authWithPassword({
                email: vm.email,
                password: vm.password
            }).then(function (authData) {
                vm.authData = authData;
                if (authData.password.isTemporaryPassword) {
                    $state.go('home.account');
                } else {
                    $state.go('home.cards');
                }
            }).catch(function () {
                $uibModal.open({
                    templateUrl: 'app/login/invalid-credentials.modal.html'
                });
            });
        };

        vm.registerUser = function() {
            auth.$createUser({
                email: vm.email,
                password: vm.password
            }).then(function(userdata) {
                vm.authData = userdata;
                vm.performLogin();
            }).catch(function() {
                $uibModal.open({
                    templateUrl: 'app/login/registration-error.modal.html'
                });
            });
        };
    }
})();
