(function () {
    'use strict';

    angular
        .module('crimsonSingles')
        .run(runBlock);

    /** @ngInject */
    function runBlock($log, $rootScope, $state) {

        /*eslint-disable */
        $rootScope.$on("$stateChangeError", function (event, toState, toParams, fromState, fromParams, error) {
            // We can catch the error thrown when the $requireAuth promise is rejected
            // and redirect the user back to the home page
            if (error === "AUTH_REQUIRED") {
                $log.debug("User AUTH not valid. Redirecting to login");
                $state.go("login");
            }
        });
        /*eslint-enable */
    }

})();
