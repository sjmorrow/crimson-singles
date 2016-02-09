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
                    }],
                    "userProfile": ['FBAuth', '$q', 'FIREBASE_URL', '$firebaseObject', function(FBAuth, $q, FIREBASE_URL, $firebaseObject) {
                        var deferred = $q.defer();
                        FBAuth.$requireAuth().then(function(authData) {
                            var fbRef = new Firebase(FIREBASE_URL + '/users/' + authData.uid);
                            var userProfile = $firebaseObject(fbRef);
                            userProfile.$loaded(function() {
                                deferred.resolve(userProfile);
                            });
                        }).catch(function(error) {
                            deferred.reject(error);
                        });
                        return deferred.promise;
                    }]
                }
            })
            .state('home.cards', {
                url: 'cards',
                templateUrl: 'app/cards/cards.html',
                controller: 'CardsController',
                controllerAs: 'cards'
            })
            .state('home.guardians', {
                url: 'guardians',
                templateUrl: 'app/guardians/guardians.html',
                controller: 'GuardiansController',
                controllerAs: 'guardians'
            })
            .state('home.matches', {
                url: 'matches',
                templateUrl: 'app/matches/matches.html',
                controller: 'MatchesController',
                controllerAs: 'matches'
            })
            .state('home.favorites', {
                url: 'favorites',
                templateUrl: 'app/favorites/favorites.html',
                controller: 'FavoritesController',
                controllerAs: 'favorites'
            })
            .state('home.donate', {
                url: 'donate',
                templateUrl: 'app/donate/donate.html',
                controller: 'DonateController',
                controllerAs: 'donate'
            })
            .state('home.account', {
                url: 'account',
                templateUrl: 'app/account/account.html',
                controller: 'AccountController',
                controllerAs: 'account'
            });


        $urlRouterProvider.otherwise('/');
    }

})();
