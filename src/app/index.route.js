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
                controller: 'MainController',
                controllerAs: 'main'
            })
            .state('home', {
                url: '/home',
                templateUrl: 'app/main/main.html',
                controller: 'MainController',
                controllerAs: 'main'
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
