(function () {
    'use strict';

    angular
        .module('crimsonSingles')
        .controller('CardsController', CardsController);

    /** @ngInject */
    function CardsController(Firebase, $firebaseObject, $log) {
        var vm = this;
        var fbRef = new Firebase("https://blinding-heat-3514.firebaseio.com");
        vm.firebase = $firebaseObject(fbRef);
        vm.refresh = function() {
            $log.debug('refreshed');
        }
        vm.swipeLeft = function(eventObject) {  
            var target;
            if (eventObject && eventObject.target) {
                target = eventObject.target;
            } else {
                target = $('[swing-card]:visible').last();
            }
            $(target).fadeOut();
        }
        vm.swipeRight = function(eventObject) {
            var target;
            if (eventObject && eventObject.target) {
                target = eventObject.target;
            } else {
                target = $('[swing-card]:visible').last();               
            }
            $(target).fadeOut();
        }
        vm.favorite = function() {
            $log.debug('favorited');
        }
    }
})();
