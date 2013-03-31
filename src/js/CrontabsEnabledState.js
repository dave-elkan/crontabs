define(["brace"], function(Brace) {
    var key = "crontabsEnabled";
    var EnabledState = Brace.Model.extend({

        namedAttributes: [
            "enabled"
        ],

        defaults: {
            "enabled": false
        },

        initialize: function() {
            this.on("change:enabled", this.persistEnablement, this);
        },

        persistEnablement: function(enabled) {
            localStorage[key] = JSON.stringify(enabled);
        },

        isEnabled: function() {
            return this.valueIsEnabled(localStorage[key]);
        },

        toggleEnablement: function() {
            this.setEnabled(!this.isEnabled());
        },

        valueIsEnabled: function(value) {
            if (value === "true") {
                return true;
            }

            return false;
        }
    });

    return new EnabledState();
});
