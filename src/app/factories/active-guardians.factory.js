(function() {
  'use strict';

  angular
    .module('crimsonSingles')
    .factory('activeGuardians', activeGuardians);

  /** @ngInject */
  function activeGuardians($firebaseArray, FIREBASE_URL) {
      var fbRef = new Firebase(FIREBASE_URL + '/active_guardians');
      return $firebaseArray(fbRef);
  }
})();
