/* global malarkey:false, moment:false */
(function() {
  'use strict';

  angular
    .module('crimsonSingles')
    .constant('malarkey', malarkey)
    .constant('moment', moment)
    .constant('FIREBASE_URL', 'https://blinding-heat-3514.firebaseio.com');

})();
