(function () {
    'use strict';

    angular
        .module('crimsonSingles')
        .controller('CardsController', CardsController);

    /** @ngInject */
    function CardsController(Firebase, $firebaseObject) {
        var vm = this;
        var fbRef = new Firebase("https://blinding-heat-3514.firebaseio.com");
        vm.firebase = $firebaseObject(fbRef);
    }
})();
