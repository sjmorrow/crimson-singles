(function () {
    'use strict';

    angular
        .module('crimsonSingles')
        .controller('MainController', MainController);

    /** @ngInject */
    function MainController(FBAuth, $state, userProfile, $scope, activeGuardian, activateGuardian, $firebaseArray) {
        var vm = this;
        vm.userProfile = userProfile;
        vm.guardians = $firebaseArray(userProfile.$ref().child('guardians'));
        
        $scope.$on('$stateChangeSuccess', function(event, toState) {
            if(toState.name === "home") {
                //User just got here. Let's make sure the VM is updated with the latest data   
            }
        });
        vm.hideNetworkIdInput = function() {
            if(userProfile.XBL_ID || userProfile.PSN_ID) {
                vm.requiresNetworkId = false;
            } else {
                // TODO: Display message that they must enter one or the other
            }
        };
        
        activeGuardian.onChange(function(hasActiveGuardian) {
             vm.hasActiveGuardian = hasActiveGuardian;
            if(hasActiveGuardian) {
                vm.guardianExpireTime = activeGuardian.getExpireDate().fromNow();
            } else {
                vm.guardianExpireTime = null;
            }
        });
        
        userProfile.$loaded(function() {
            if(!userProfile.XBL_ID && !userProfile.PSN_ID) {
                vm.requiresNetworkId = true;
                userProfile.$bindTo($scope, 'profile');
            }
            if(!userProfile.guardians || userProfile.guardians.length === 0) {
                vm.needsToCreateGuardian = true;
            }
            activeGuardian.setUserProfile(userProfile);
            if(activeGuardian.exists()) {
                vm.guardianExpireTime = activeGuardian.getExpireDate().fromNow();
                vm.hasActiveGuardian = true;
            } else {
                vm.guardianExpireTime = null;
                vm.hasActiveGuardian = false;
            }
        });

        vm.logout = function () {
            FBAuth.$unauth();
            $state.go('login');
        };
        
        vm.activateGuardian = function(guardian) {
            //TODO: Move this to activateGuardian service, and set correct expireTime in minutes
            //activeGuardian.activateGuardian(guardian, 1);  
            activateGuardian(guardian);
        };
    }
})();
