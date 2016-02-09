(function () {
    'use strict';

    angular
        .module('crimsonSingles')
        .controller('MatchesController', MatchesController);

    /** @ngInject */
    function MatchesController(FIREBASE_URL, $firebaseArray, currentAuth) {
        var vm = this;
        
        var matchedGuardiansRef = new Firebase(FIREBASE_URL + '/users/' + currentAuth.uid + '/matched_guardians');
        vm.matchedGuardians = $firebaseArray(matchedGuardiansRef)
    }
})();
