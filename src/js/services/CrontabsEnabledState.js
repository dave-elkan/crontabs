angular.module("crontabs").factory("CrontabsEnabledState", function(webStorage) {

    var enabled = webStorage.get("crontabsEnabled") || false;
    var callbacks = [];

    return {

        onChange: function(cb) {
            callbacks.push(cb);
        },

        isEnabled: function() {
            return !!enabled;
        },

        toggleEnabled: function() {
            enabled = !enabled;
            webStorage.add("crontabsEnabled", enabled);
            _.each(callbacks, function(cb) {
                cb(enabled);
            });
        }

    };
});
