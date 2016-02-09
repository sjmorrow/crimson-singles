(function () {
    'use strict';

    angular
        .module('crimsonSingles')
        .factory('activeGuardian', activeGuardian);

    /** @ngInject */
    function activeGuardian($timeout, $q, $firebaseObject, FIREBASE_URL, activeGuardians) {
        var userProfile = null;
        
        // Promise for notifying when active state has changed
        // Resolves with true if guardian is now active
        // Resolves with false if guardian is now expired
        var guardianChangeNotifier = $q.defer();
        
        //Called in MainController, so guaranteed to be defined for all children
        function setUserProfile(_userProfile) {
            userProfile = _userProfile;
            if(exists()) {
                setExpireTimer(getExpireDate());
            }
        }

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
            } else if ((getExpireDate().valueOf() - moment().valueOf()) > 0) {
                return true;
            } else {
                //It's already expired, clear out the active flag and return false;
                clearActiveGuardian();
                return false;
            }
        }

        function onChange(handler) {
            if (handler) {
                guardianChangeNotifier.promise.then(handler);
            }
            return guardianChangeNotifier.promise;
        }
        
        function setExpireTimer(expiresOn) {
            $timeout(function() {
                guardianChangeNotifier.resolve(false);
            }, expiresOn.valueOf() - moment().valueOf());
        }

        function activateGuardian(guardian, minutes, gameMode) {
            userProfile.activeGuardianId = guardian.$id;
            userProfile.$save();
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
                activeGuardians.$add(globalGuardian);
                //Guardian is active, tell the world
                guardianChangeNotifier.resolve(true);
                setExpireTimer(moment().add(minutes, 'minutes'));
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
            activateGuardian: activateGuardian,
            onChange: onChange
        };
    }
})();