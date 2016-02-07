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
        vm.updateGuardian = function(key) {
            vm.guardians.$save(key);
        };
        vm.addGuardian = function() {
            vm.guardians.$add({
                preferred_subclass: '',
                platform: '',
                level: 0,
                class: '',
                bio: ''
            });
        };
        vm.selectClass = function(key, clazz) {
            vm.guardians[key].class = clazz;
            vm.guardians.$save(key);
        };
        vm.selectPlatform = function(key, platform) {
            vm.guardians[key].platform = platform;
            vm.guardians.$save(key);
        };
    }
})();
