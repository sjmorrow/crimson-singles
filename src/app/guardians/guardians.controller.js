(function () {
    'use strict';

    angular
        .module('crimsonSingles')
        .controller('GuardiansController', GuardiansController);

    /** @ngInject */
    function GuardiansController(FIREBASE_URL, $firebaseArray, currentAuth, $uibModal, activeGuardians, activeGuardian, userProfile, activateGuardianModal) {
        var vm = this;

        var fbRef = new Firebase(FIREBASE_URL + '/users/' + currentAuth.uid + '/guardians');
        vm.guardians = $firebaseArray(fbRef);

        vm.userProfile = userProfile;

        vm.updateGuardian = function(key) {
            vm.guardians.$save(key);
        };
        vm.addGuardian = function() {
            if(vm.guardians.length === 6) {
                alert('I dont think you really need more than 6 guardians, do you?');
            } else {
                vm.guardians.$add({
                    preferred_subclass: '',
                    platform: '',
                    level: 0,
                    class: '',
                    bio: ''
                });
            }
        };
        vm.selectClass = function(key, clazz) {
            vm.guardians[key].class = clazz;
            vm.guardians.$save(key);
        };
        vm.selectPlatform = function(key, platform) {
            vm.guardians[key].platform = platform;
            vm.guardians.$save(key);
        };
        vm.activateGuardian = function(key) {
            activateGuardianModal(vm.guardians[key]);
        };
    }
})();
