(function() {
  'use strict';

  angular
    .module('crimsonSingles')
    .factory('gameModes', gameModes);

  /** @ngInject */
  function gameModes($firebaseArray, FIREBASE_URL) {
      var fbRef = new Firebase(FIREBASE_URL + '/events');
      return $firebaseArray(fbRef);
  }
})();
