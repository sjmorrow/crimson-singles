(function () {
    'use strict';

    angular
        .module('crimsonSingles')
        .config(config);

    /** @ngInject */
    function config($logProvider, toastrConfig, laddaProvider) {
        // Enable log
        $logProvider.debugEnabled(true);

        // Set options third-party lib
        toastrConfig.allowHtml = true;
        toastrConfig.timeOut = 3000;
        toastrConfig.positionClass = 'toast-top-right';
        toastrConfig.preventDuplicates = true;
        toastrConfig.progressBar = true;
        
        laddaProvider.setOption({
            style: 'zoom-out'
        });
    }

    angular
        .module('crimsonSingles')
        .factory("FBAuth", fbAuth);

    /** @ngInject */
    function fbAuth($firebaseAuth, FIREBASE_URL) {
        var ref = new Firebase(FIREBASE_URL);
        return $firebaseAuth(ref);
    }
})();
