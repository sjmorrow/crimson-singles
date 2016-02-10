(function () {
    'use strict';

    angular
        .module('crimsonSingles')
        .factory('activeGuardian', activeGuardian);

    /** @ngInject */
    function activeGuardian($timeout, $q, $firebaseObject, FIREBASE_URL, activeGuardians, $rootScope) {
        var userProfile = null;
        
        //Called in MainController, so guaranteed to be defined for all children
        function setUserProfile(_userProfile) {
            userProfile = _userProfile;
            if(exists()) {
                setExpireTimer(getExpireDate());
            }
        }

        function getExpireDate() {
            if (angular.isDefined(getActiveGuardian().expiresOn)) {
                return moment(getActiveGuardian().expiresOn);
            }
            return moment();
        }

        function getActiveGuardian() {
            return userProfile.guardians[userProfile.activeGuardianId];
        }

        function exists() {
            if (angular.isUndefined(userProfile.activeGuardianId) || userProfile.activeGuardianId === null) {
                return false;
            } else if ((getExpireDate().valueOf() - moment().valueOf()) > 0) {
                return true;
            } else {
                //It's already expired, clear out the active flag and return false;
                clearActiveGuardian();
                return false;
            }
        }
        
        function setExpireTimer(expiresOn) {
            $timeout(function() {
                $rootScope.$broadcast('$guardianExpired');
            }, expiresOn.valueOf() - moment().valueOf());
        }

        function activateGuardian(guardian, minutes, gameMode) {
            var fbRef = new Firebase(FIREBASE_URL + '/users/' + userProfile.$id + '/guardians/' + guardian.$id);
            var fbGuardian = $firebaseObject(fbRef);
            fbGuardian.$loaded(function(guardian) {
                fbGuardian.expiresOn = moment().add(minutes, 'minutes').format();
                fbGuardian.$save();
                var globalGuardian = {
                    networkId: '',
                    event_code: gameMode,
                    activatedOn: moment().format()
                };
                if (guardian.platform == 'XBOX') {
                    globalGuardian.networkId = userProfile.XBL_ID;
                } else if (guardian.platform == 'PSN') {
                    globalGuardian.networkId = userProfile.PSN_ID;
                }
                angular.extend(globalGuardian, guardian);
                activeGuardians.$add(globalGuardian).then(function(ref) {
                    userProfile.activeGuardianRef = ref.key();
                    userProfile.activeGuardianId = guardian.$id;
                    userProfile.$save().then(function() {
                        //Guardian is active, tell the world
                        $rootScope.$broadcast('$guardianActivated')
                        setExpireTimer(moment().add(minutes, 'minutes'));
                        
                    });
                });
            });
        }
        
        function clearActiveGuardian() {
            userProfile.activeGuardianId = null;
            userProfile.$save();
        }

        return {
            getExpireDate: getExpireDate,
            getActiveGuardian: getActiveGuardian,
            exists: exists,
            setUserProfile: setUserProfile,
            activateGuardian: activateGuardian
        };
    }
})();