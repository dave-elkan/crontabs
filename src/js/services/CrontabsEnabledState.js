angular.module("crontabs").factory("CrontabsEnabledState", function(webStorage, Messaging) {

    var callbacks = [];

    function getEnabledState() {
        return webStorage.get("crontabsEnabled") || false;
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
            webStorage.add("crontabsEnabled", enabled);
            _.each(callbacks, function(cb) {
                cb(enabled);
            });
            Messaging.sendMessage({
                enabled: enabled
            });
        }

    };
});
