(function () {
    'use strict';

    angular
        .module('crimsonSingles')
        .config(routerConfig);

    /** @ngInject */
    function routerConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('login', {
                url: '/',
                templateUrl: 'app/login/login.html',
                controller: 'LoginController',
                controllerAs: 'login'
            })
            .state('home', {
                url: '/home',
                templateUrl: 'app/main/main.html',
                controller: 'MainController',
                controllerAs: 'main',
                resolve: {
                    "currentAuth": ["FBAuth", function (FBAuth) {
                        return FBAuth.$requireAuth();
                    }]
                }
            })
            .state('home.cards', {
                url: '/cards',
                templateUrl: 'app/cards/cards.html',
                controller: 'MainController',
                controllerAs: 'main'
            });

        $urlRouterProvider.otherwise('/');
    }

})();
