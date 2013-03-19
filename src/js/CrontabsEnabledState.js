define(function() {
    var key = "crontabsEnabled";
    return {
        set: function(enabled) {
            localStorage[key] = JSON.stringify(enabled);
        },

        isEnabled: function() {
            var enabled = localStorage[key];
            if (!enabled) {
                this.set(false);
                return false;
            }

            return true;
        }
    }
});
