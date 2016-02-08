(function () {
    'use strict';

    angular
        .module('crimsonSingles')
        .controller('CardsController', CardsController);

    /** @ngInject */
    function CardsController(FIREBASE_URL, $firebaseObject, 
                              $firebaseArray, $log, currentAuth, activeGuardians) {
        var vm = this;
        vm.activeGuardians = activeGuardians;      
        
        var matchedGuardiansRef = new Firebase(FIREBASE_URL + '/users/' + currentAuth.uid + '/matched_guardians');
        vm.matchedGuardians = $firebaseArray(matchedGuardiansRef)
        
        var favoriteGuaridansRef = new Firebase(FIREBASE_URL + '/users/' + currentAuth.uid + '/favorite_guardians');
        vm.favoriteGuardians = $firebaseArray(favoriteGuaridansRef) 
        
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
    }
})();
