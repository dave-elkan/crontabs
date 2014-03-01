angular.module("crontabs").factory("CrontabsEnabledState", ['webStorage', 'Messaging', function(webStorage, Messaging) {

    var callbacks = [];

    var CRONTABS_ENABLED_KEY = "crontabsEnabled";

    function getEnabledState() {
        return webStorage.get(CRONTABS_ENABLED_KEY) || false;
    }

    if (webStorage.get(CRONTABS_ENABLED_KEY) == undefined) {
        webStorage.add(CRONTABS_ENABLED_KEY, false);
    }

    return {

        onChange: function(cb) {
            callbacks.push(cb);
        },

        isEnabled: function() {
            return getEnabledState();
        },

        toggleEnabled: function() {
            var enabled = !getEnabledState();
            webStorage.add(CRONTABS_ENABLED_KEY, enabled);
            _.each(callbacks, function(cb) {
                cb(enabled);
            });
            Messaging.sendMessage({
                enabled: enabled
            });
        }

    };
}]);
