(function () {
    'use strict';

    angular
        .module('crimsonSingles')
        .controller('GuardiansController', GuardiansController);

    /** @ngInject */
    function GuardiansController(FIREBASE_URL, $firebaseArray, currentAuth) {
        var vm = this;
        var fbRef = new Firebase(FIREBASE_URL + '/users/' + currentAuth.uid + '/guardians');
        vm.guardians = $firebaseArray(fbRef);
        vm.addGuardian = function() {
            vm.guardians.$add({
                preferred_subclass: '',
                platform: '',
                level: 0,
                class: '',
                bio: ''
            });
        };
    }
})();
