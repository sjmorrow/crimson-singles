(function () {
    'use strict';

    angular
        .module('crimsonSingles')
        .controller('MainController', MainController);

    /** @ngInject */
    function MainController(FBAuth, $state, userProfile, $scope, activeGuardian) {
        var vm = this;
        vm.userProfile = userProfile;
        vm.hideNetworkIdInput = function() {
            if(userProfile.XBL_ID || userProfile.PSN_ID) {
                vm.requiresNetworkId = false;
            } else {
                // TODO: Display message that they must enter one or the other
            }
        };
        
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
                activeGuardian.onExpire().then(function(){
                    vm.guardianExpireTime = null;
                    vm.hasActiveGuardian = false;
                });
            }
        });

        vm.logout = function () {
            FBAuth.$unauth();
            $state.go('login');
        };
    }
})();
