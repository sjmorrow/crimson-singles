(function () {
    'use strict';

    angular
        .module('crimsonSingles')
        .controller('FavoritesController', FavoritesController);

    /** @ngInject */
    function FavoritesController(FIREBASE_URL, $firebaseArray, currentAuth) {
        var vm = this;
        
        var favoriteGuardiansRef = new Firebase(FIREBASE_URL + '/users/' + currentAuth.uid + '/favorite_guardians');
        vm.favoriteGuardians = $firebaseArray(favoriteGuardiansRef)
    }
})();
