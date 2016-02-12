(function() {
    'use strict';

    angular
        .module('crimsonSingles')
        .directive('swipeCard', swipeCard);
    
    /** @ngInject */
    function swipeCard() {        
        var directive = {
            restrict: 'A',
            link: linkFunc
        };
        
        return directive;
        
        function linkFunc(scope, el) {               
            scope.dragged = function(eventObject) {
                var confidence = eventObject.throwOutConfidence;
                if (eventObject) {
                    if (eventObject.throwDirection > 0) {
                        el.find('.heart-overlay').css('opacity', confidence);
                    } else {
                        el.find('.hide-overlay').css('opacity', confidence);
                        el.css('opacity', 1.5 - confidence);
                    }
                }
            };
            scope.draggedStopped = function(eventObject) {
                if (eventObject) {
                    el.find('.heart-overlay, .hide-overlay').css('opacity', 0);
                    el.css('opacity', 1);
                }  
            };
        }
    }
})();