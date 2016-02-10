(function () {
    'use strict';

    angular
        .module('crimsonSingles')
        .factory('activateGuardianModal', activateGuardianModal);

    /** @ngInject */
    function activateGuardianModal($uibModal, activeGuardians, activeGuardian, $state) {

        return function (guardian) {
            $uibModal.open({
                templateUrl: 'app/guardians/activate-guardian.modal.html',
                resolve: {
                    "userProfile": ['FBAuth', '$q', 'FIREBASE_URL', '$firebaseObject', function (FBAuth, $q, FIREBASE_URL, $firebaseObject) {
                        var deferred = $q.defer();
                        FBAuth.$requireAuth().then(function (authData) {
                            var fbRef = new Firebase(FIREBASE_URL + '/users/' + authData.uid);
                            deferred.resolve($firebaseObject(fbRef));
                        }).catch(function (error) {
                            deferred.reject(error);
                        });
                        return deferred.promise;
                    }]
                },
                controller: /**ngInject*/ function (activationLengths, gameModes, userProfile) {
                    var vm = this;
                    vm.guardian = guardian;
                    vm.activationLengths = activationLengths;
                    vm.gameModes = gameModes;
                    vm.selectedLength = '3';
                    vm.selectedGameMode = 'CRIMSON_PVP';
                    vm.userProfile = userProfile;
                    switch (guardian.class) {
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
            }).result.then(function (modal) {
                var guardian = modal.guardian;
                var selectedLength = modal.selectedLength;
                var selectedGameMode = modal.selectedGameMode;
                var minutesToActivate = parseInt(selectedLength);
                activeGuardian.activateGuardian(guardian, minutesToActivate, selectedGameMode);
            }).catch(function () {

            });
        };
    }
})();