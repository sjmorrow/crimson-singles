(function () {
    'use strict';

    angular
        .module('crimsonSingles')
        .controller('CardsController', CardsController);

    /** @ngInject */
    function CardsController(FIREBASE_URL, $firebaseObject, 
                              $firebaseArray, $log, currentAuth, activeGuardians) {
        var vm = this;
        var matchedGuardiansRef = new Firebase(FIREBASE_URL + '/users/' + currentAuth.uid + '/matched_guardians');
        vm.activeGuardians = activeGuardians;
        vm.matchedGuardians = $firebaseArray(matchedGuardiansRef)
        vm.swingOptions = {
            throwOutConfidence: function (offset, element) {
                return Math.min(2 * Math.abs(offset) / element.offsetWidth, 1);
            },
            isThrowOut: function (offset, element, throwOutConfidence) {
                return throwOutConfidence === 1;
            }
        }
        vm.refresh = function() {
            $log.debug('refreshed');
        }
        vm.swipeRight = function(guardian) {            
            if (guardian) {
                vm.matchedGuardians.$add(guardian);
            }
            vm.activeGuardians.pop();
        }
        vm.favorite = function() {
            $log.debug('favorited');
        }
    }
})();
