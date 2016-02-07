(function () {
    'use strict';

    angular
        .module('crimsonSingles')
        .controller('CardsController', CardsController);

    /** @ngInject */
    function CardsController(Firebase, $firebaseObject, $log) {
        var vm = this;
        var fbRef = new Firebase("https://blinding-heat-3514.firebaseio.com");
        vm.swingOptions = {
            throwOutConfidence: function (offset, element) {
                $log.debug('confidence');
                return Math.min(2 * Math.abs(offset) / element.offsetWidth, 1);
            },
            isThrowOut: function (offset, element, throwOutConfidence) {
                $log.debug('isThrowOut', offset, element.offsetWidth, throwOutConfidence);
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
        vm.swipeRight = function(eventObject) {
            var target;
            if (eventObject && eventObject.target) {
                target = eventObject.target;
            } else {
                target = angular.element('[swing-card]:visible').last(); 
//                var card = Swing.Stack().getCard(target)
//                if (card) {
//                    card.throwOut(Card.DIRECTION_RIGHT, 0);
//                }
            }
            angular.element(target).fadeOut();
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
