(function() {
  'use strict';

  angular
    .module('crimsonSingles')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
