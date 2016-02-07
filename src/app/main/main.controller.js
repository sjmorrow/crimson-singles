(function () {
    'use strict';

    angular
        .module('crimsonSingles')
        .controller('MainController', MainController);

    /** @ngInject */
    function MainController($firebaseObject, FBAuth, $state, currentAuth, FIREBASE_URL) {
        var vm = this;
        vm.authData = currentAuth;
        var fbRef = new Firebase(FIREBASE_URL + '/users/' + currentAuth.uid);
        vm.userData = $firebaseObject(fbRef);

        vm.logout = function () {
            FBAuth.$unauth();
            $state.go('login');
        };
    }
})();
