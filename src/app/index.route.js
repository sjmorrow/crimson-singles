(function () {
    'use strict';

    angular
        .module('crimsonSingles')
        .config(routerConfig);

    /** @ngInject */
    function routerConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: 'app/login/login.html',
                controller: 'LoginController',
                controllerAs: 'login'
            })
            .state('forgot', {
                url: '/forgot',
                templateUrl: 'app/forgot-password/forgot-password.html',
                controller: 'ForgotController',
                controllerAs: 'forgot'
            })
            .state('home', {
                url: '/',
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
            })
            .state('home.account', {
                url: '/account',
                templateUrl: 'app/account/account.html',
                controller: 'AccountController',
                controllerAs: 'account'
            });


        $urlRouterProvider.otherwise('/');
    }

})();
