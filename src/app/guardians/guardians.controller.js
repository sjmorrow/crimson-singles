(function () {
    'use strict';

    angular
        .module('crimsonSingles')
        .controller('GuardiansController', GuardiansController);

    /** @ngInject */
    function GuardiansController(FIREBASE_URL, $firebaseArray, currentAuth, $uibModal, activeGuardians, userProfile) {
        var vm = this;

        var fbRef = new Firebase(FIREBASE_URL + '/users/' + currentAuth.uid + '/guardians');
        vm.guardians = $firebaseArray(fbRef);


        vm.checkForActiveGuardian = function() {
            var expireDate = moment(activeGuardians[userProfile.activeGuardianId]);
            if (expireDate.diff(moment(), 'seconds') > 0) {
                //Guardian has expired. Allow user to activate a new one
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
            $uibModal.open({
                templateUrl: 'app/guardians/activate-guardian.modal.html',
                resolve: {
                    guardian: vm.guardians[key]
                },
                controller: /**ngInject*/ function(guardian, activationLengths) {
                    var vm = this;
                    vm.guardian = guardian;
                    vm.activationLengths = activationLengths;
                    vm.selectedLength = '5';
                    switch(guardian.class) {
                        case 'TITAN':
                            vm.class = 'Titan';
                            break;
                        case 'HUNTER':
                            vm.class = 'Hunter';
                            break;
                        case 'WARLOCK':
                            vm.class = 'Warlock';
                            break;
                    }
                },
                controllerAs: 'modal'
            }).result.then(function(guardian, selectedLength) {
                guardian.expiresOn = moment().add(selectedLength, 'minutes').format();
                var activeGuardian = {
                    networkId: ''
                };
                if (guardian.platform == 'XBOX') {
                    activeGuardian.networkId = userProfile.XBL_ID;
                } else if (guardian.platform == 'PSN') {
                    activeGuardian.networkId = userProfile.PSN_ID;
                }
                angular.extend(activeGuardian, guardian);
                activeGuardians.$add(activeGuardian);
                vm.userProfile.activeGuardianId = key;
                vm.userProfile.$save();
                //TODO: Direct to home.cards
                vm.guardians.$save(key);
            }).catch(function() {
                
            });
        };
    }
})();
