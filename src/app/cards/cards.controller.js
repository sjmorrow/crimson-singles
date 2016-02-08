(function () {
    'use strict';

    angular
        .module('crimsonSingles')
        .controller('CardsController', CardsController);

    /** @ngInject */
    function CardsController(FIREBASE_URL, $firebaseObject, $firebaseArray, $log, currentAuth) {
        var vm = this;
        var fbRef = new Firebase("https://blinding-heat-3514.firebaseio.com");
        var matchedGuardiansRef = new Firebase(FIREBASE_URL + '/users/' + currentAuth.uid + '/matched_guardians');
        
        vm.matchedGuardians = $firebaseArray(matchedGuardiansRef)
        vm.swingOptions = {
            throwOutConfidence: function (offset, element) {
                return Math.min(2 * Math.abs(offset) / element.offsetWidth, 1);
            },
            isThrowOut: function (offset, element, throwOutConfidence) {
                return throwOutConfidence === 1;
            }
        }
        vm.firebase = $firebaseObject(fbRef);
        vm.refresh = function() {
            $log.debug('refreshed');
        }
        vm.swipeLeft = function(eventObject) {  
            var target;
            if (eventObject && eventObject.target) {
                target = eventObject.target;
            } else {
                target = angular.element('[swing-card]:visible').last();
            }
            angular.element(target).fadeOut();
        }
        vm.swipeRight = function(guardian) {
            $log.debug(guardian)
//            $log.debug(angular.element('[swing-stack]'))
//            var target;
//            if (eventObject && eventObject.target) {
//                target = eventObject.target;
//            } else {
//                target = angular.element('[swing-card]:visible').last(); 
////                var card = Swing.Stack().getCard(target)
////                if (card) {
////                    card.throwOut(Card.DIRECTION_RIGHT, 0);
////                }
//            }
//            angular.element(target).fadeOut();
        }
        vm.favorite = function() {
            $log.debug('favorited');
        }
//        vm.swipe = function(eventObject) {   
//            $log.debug(eventObject.target);
//            if (eventObject && eventObject.throwOutConfidence > 0.5) {
//                eventObject.target.isThrowOut = true;
//                if (eventObject.throwDirection > 0) {
//                    this.swipeRight(eventObject);
//                } else {
//                    this.swipeLeft(eventObject);
//                }
//            }
//        }
    }
})();
