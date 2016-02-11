(function () {
    'use strict';

    angular
        .module('crimsonSingles')
        .controller('MainController', MainController);

    /** @ngInject */
    function MainController(FBAuth, $state, userProfile, $scope, activeGuardian, activeGuardians, activateGuardianModal, $firebaseArray) {
        var vm = this;
        //userProfile guaranteed to be loaded and updated in real-time with server
        vm.userProfile = userProfile;
        //NOTE: Need to set this here for now until I find a way to inject a $loaded userProfile directly into the factory
        activeGuardian.setUserProfile(userProfile);
        //TODO: On state change success, double check guardian is active
        
        vm.activeGuardians = activeGuardians;

        $scope.$on('$stateChangeSuccess', function () {
            if ($state.is('home')) {

                if (!userProfile.XBL_ID && !userProfile.PSN_ID) {
                    vm.requiresNetworkId = true;
                    userProfile.$bindTo($scope, 'profile');
                }

                if (!userProfile.guardians || userProfile.guardians.length === 0) {
                    vm.needsToCreateGuardian = true;
                } else {
                    vm.needsToCreateGuardian = false;
                    if (activeGuardian.exists()) {
                        vm.guardianExpireTime = activeGuardian.getExpireDate().fromNow();
                        vm.hasActiveGuardian = true;
                    } else {
                        vm.guardianExpireTime = null;
                        vm.hasActiveGuardian = false;
                    }
                }
            }
        });

        $scope.$on('$guardianExpired', function () {
            vm.guardianExpireTime = null;
            vm.hasActiveGuardian = false;
        });
        $scope.$on('$guardianActivated', function () {
            vm.guardianExpireTime = activeGuardian.getExpireDate().fromNow();
            vm.hasActiveGuardian = true;
            $state.go('home.cards');
        });

        vm.guardians = $firebaseArray(userProfile.$ref().child('guardians'));

        vm.hideNetworkIdInput = function () {
            if (userProfile.XBL_ID || userProfile.PSN_ID) {
                vm.requiresNetworkId = false;
            } else {
                // TODO: Display message that they must enter one or the other
            }
        };

        vm.logout = function () {
            FBAuth.$unauth();
            $state.go('login');
        };

        vm.activateGuardian = function (guardian) {
            activateGuardianModal(guardian);
        };
    }
})();