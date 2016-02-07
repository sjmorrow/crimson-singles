(function() {
  'use strict';

  angular
    .module('crimsonSingles')
    .factory('activationLengths', activationLengths);

  /** @ngInject */
  function activationLengths($firebaseObject, FIREBASE_URL) {
      var fbRef = new Firebase(FIREBASE_URL + '/activation_lengths');
      return $firebaseObject(fbRef);
  }
})();
