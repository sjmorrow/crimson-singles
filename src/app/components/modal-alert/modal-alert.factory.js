(function () {
    'use strict';

    angular
        .module('crimsonSingles')
        .factory('modalAlert', modalAlert);

    /** @ngInject */
    function modalAlert($uibModal) {
        return function(title, message) {
            return $uibModal.open({
                templateUrl: 'app/components/modal-alert/modal-alert.tmpl.html',
                controller: function() {
                    var vm = this;
                    vm.title = title;
                    vm.message = message;
                },
                controllerAs: 'modal'
            });  
        };
    }
})();