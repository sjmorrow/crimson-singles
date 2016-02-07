(function () {
    'use strict';

    angular
        .module('crimsonSingles')
        .controller('MainController', MainController);

    /** @ngInject */
    function MainController($timeout, webDevTec, toastr, $firebaseObject, FBAuth, $state, currentAuth) {
        var vm = this;

        vm.authData = currentAuth;

        vm.logout = function () {
            FBAuth.$unauth();
            $state.go('login');
        };
    }
})();
