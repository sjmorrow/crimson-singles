(function () {
    'use strict';

    angular
        .module('crimsonSingles')
        .controller('ForgotController', ForgotController);

    /** @ngInject */
    function ForgotController($firebaseAuth, FIREBASE_URL, $state, $uibModal) {
        var vm = this;
        var fbRef = new Firebase(FIREBASE_URL);
        var auth = $firebaseAuth(fbRef);

        vm.reset = function () {
            auth.$resetPassword({
                email: vm.email
            }).then(function () {
                $uibModal.open({
                    templateUrl: 'app/forgot-password/password-reset-successful.modal.html'
                });
                $state.go('login');
            }).catch(function () {
                $uibModal.open({
                    templateUrl: 'app/forgot-password/password-reset-failed.modal.html'
                });
            });
        };
    }
})();
