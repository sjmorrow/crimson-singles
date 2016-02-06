(function () {
    'use strict';

    angular
        .module('crimsonSingles')
        .controller('LoginController', LoginController);

    /** @ngInject */
    function LoginController($firebaseAuth, FIREBASE_URL, $state) {
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
                $state.go('home.cards');
            }).catch(function (error) {
                //TODO: Alert error
                vm.error = error;
            });
        };

        vm.registerUser = function() {
            auth.$createUser({
                email: vm.email,
                password: vm.password
            }).then(function(userdata) {
                vm.authData = userdata;
                vm.performLogin();
            }).catch(function(error) {
                //TODO: Alert error
                vm.error = error;
            });
        };
    }
})();
