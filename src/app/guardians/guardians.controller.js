(function () {
    'use strict';

    angular
        .module('crimsonSingles')
        .controller('GuardiansController', GuardiansController);

    /** @ngInject */
    function GuardiansController(FIREBASE_URL, $firebaseArray, currentAuth, $uibModal, activeGuardians, userProfile, activateGuardian) {
        var vm = this;

        var fbRef = new Firebase(FIREBASE_URL + '/users/' + currentAuth.uid + '/guardians');
        vm.guardians = $firebaseArray(fbRef);


        vm.checkForActiveGuardian = function() {
            var activeGuardian = vm.guardians.$getRecord(userProfile.activeGuardianId);
            if(activeGuardian && activeGuardian.hasOwnProperty('expiresOn')) {
                var expireDate = moment(activeGuardian.expiresOn);
                if (expireDate.diff(moment(), 'seconds') < 0) {
                    //Guardian has expired. Allow user to activate a new one
                    vm.userProfile.activeGuardianId = null;
                    vm.userProfile.$save();
                }
            } else {
                // No active guardian, make sure field is cleared
                vm.userProfile.activeGuardianId = null;
                vm.userProfile.$save();
            }
        };

        vm.userProfile = userProfile;
        vm.userProfile.$loaded(vm.checkForActiveGuardian);

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
        vm.activateGuardian = function(key) {
            activateGuardian(vm.guardians[key]);
        };
    }
})();
