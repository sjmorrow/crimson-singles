(function() {
  'use strict';

  angular
    .module('crimsonSingles')
    .factory('activeGuardian', activeGuardian);

  /** @ngInject */
  function activeGuardian($timeout, $q) {
      var userProfile = null;
      function getExpireDate() {
          if (getActiveGuardian().expiresOn !== undefined) {
            return moment(getActiveGuardian().expiresOn);  
          }
          return moment();
      }
      function getActiveGuardian() {
          return userProfile.guardians[userProfile.activeGuardianId];
      }
      function exists() {
          if ((userProfile.activeGuardianId === undefined)) {
              return false;
          } else if((getExpireDate().valueOf() - moment().valueOf()) > 0) {
              return true;
          } else {
              //It's already expired, clear out the active flag and return false;
              userProfile.activeGuardianId = null;
              userProfile.$save();
              return false;
          }
      }
      function setUserProfile(_userProfile) {
          userProfile = _userProfile;
      }
      function onExpire() {
          var deferred = $q.defer();
          $timeout(deferred.resolve, getExpireDate().valueOf() - moment().valueOf());
          return deferred.promise;
      }
      
      return {
          getExpireDate: getExpireDate,
          getActiveGuardian: getActiveGuardian,
          exists: exists,
          setUserProfile: setUserProfile,
          onExpire: onExpire
      };
  }
})();
