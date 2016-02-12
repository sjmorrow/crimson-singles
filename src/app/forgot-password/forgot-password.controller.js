(function () {
    'use strict';

    angular
        .module('crimsonSingles')
        .controller('ForgotController', ForgotController);

    /** @ngInject */
    function ForgotController($firebaseAuth, FIREBASE_URL, $state, modalAlert) {
        var vm = this;
        var fbRef = new Firebase(FIREBASE_URL);
        var auth = $firebaseAuth(fbRef);

        vm.reset = function () {
            auth.$resetPassword({
                email: vm.email
            }).then(function () {
                modalAlert("Success!", "Your password was reset succesfully! You will recieve an email shortly with a temporary password. Once you login you will be taken to the passowrd reset screen. You will have 24 hours to update your temporary password.");
                $state.go('login');
            }).catch(function () {
                modalAlert("Reset Password Error", "Whoops! An error occured resetting your password. Can you double check that you entered the correct email?");
            });
        };
    }
})();
