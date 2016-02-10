(function () {
    'use strict';

    angular
        .module('crimsonSingles')
        .controller('CardsController', CardsController);

    /** @ngInject */
    function CardsController(FIREBASE_URL, $firebaseObject, 
                              $firebaseArray, $log, currentAuth, activeGuardians, activeGuardian, $uibModal, $state) {
        var vm = this;
        if(!activeGuardian.exists()) {
            $uibModal.open({
                templateUrl: 'app/cards/no-active-guardian.modal.html'
            }).result.then(function() {
                $state.go('home');
            });
        } else {
            vm.activeGuardians = activeGuardians;

            var currentUserRef = new Firebase(FIREBASE_URL + '/users/' + currentAuth.uid)
            vm.currentUser = $firebaseObject(currentUserRef)

            var matchedGuardiansRef = new Firebase(FIREBASE_URL + '/users/' + currentAuth.uid + '/matched_guardians');
            vm.matchedGuardians = $firebaseArray(matchedGuardiansRef)

            var favoriteGuaridansRef = new Firebase(FIREBASE_URL + '/users/' + currentAuth.uid + '/favorite_guardians');
            vm.favoriteGuardians = $firebaseArray(favoriteGuaridansRef)

            vm.activeGuardians.$loaded().then(function(guardians) {
                if (guardians.length) {
                    vm.activatedTimestamp = guardians[0].activatedOn
                } 
            });

            vm.swingOptions = {
                throwOutConfidence: function (offset, element) {
                    return Math.min(2 * Math.abs(offset) / element.offsetWidth, 1);
                },
                isThrowOut: function (offset, element, throwOutConfidence) {
                    return throwOutConfidence === 1;
                }
            };
            vm.showInStack = function(guardian) {
                var isUsersXBLGuardian = (vm.currentUser.XBL_ID === guardian.networkId && guardian.platform === 'XBOX');
                var isUsersPSNGuardian = (vm.currentUser.PSN_ID === guardian.networkId && guardian.platform === 'PSN');
                var isSamePlatform = (activeGuardian.getActiveGuardian().platform === guardian.platform);
                return ((!isUsersXBLGuardian && !isUsersPSNGuardian) && isSamePlatform);
            };
            vm.dequeue = function() {
                var removed = vm.activeGuardians.splice(0, 1)[0];            
                if (vm.activeGuardians.length) {
                    vm.activatedTimestamp = vm.activeGuardians[0].activatedOn
                }
                return removed
            } ;       
            vm.refresh = function() {
                window.location.reload()
                //vm.activeGuardians = $firebaseArray(activeGuardians.$ref())
            };
        }
    }
})();
