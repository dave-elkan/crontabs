define(["brace"], function(Brace) {
    var key = "crontabsEnabled";
    var EnabledState = Brace.Model.extend({

        namedAttributes: [
            "enabled"
        ],

        initialize: function() {
            this.setEnabled(this.isEnabled());
            this.on("change", this.persistEnablement, this);
        },

        persistEnablement: function() {
            localStorage[key] = JSON.stringify(this.getEnabled());
        },

        isEnabled: function() {
            return this.valueIsEnabled(localStorage[key]);
        },

        toggleEnablement: function() {
            this.setEnabled(!this.getEnabled());
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
