var Firebase = require("firebase");
var moment = require('moment');

var fbRef = new Firebase("https://blinding-heat-3514.firebaseio.com/active_guardians");
//var fbRef = new Firebase("https://crimson-singles.firebaseio.com/active_guardians");
setInterval(function() {
    fbRef.once('value', function(dataSnapshot) {
        dataSnapshot.forEach(function(node) {
            var key = node.key();
            var guardian = node.val();
            var expiresOn = moment(guardian.expiresOn);
            var secondsUntilExpire = expiresOn.diff(moment(), 'seconds');
            if(secondsUntilExpire < 0) {
                console.log("Deleting " + key);
                fbRef.child(key).remove();
            }
        });
    });
}, 3000);
