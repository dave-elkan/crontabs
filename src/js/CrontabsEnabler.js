define(["brace", "ChromeBrowserAction", "MessageManager"], function(Brace, ChromeBrowserAction, MessageManager) {
    return Brace.View.extend({

        initialize: function() {
            ChromeBrowserAction.onEnableButtonClicked(_.bind(function() {
                this.model.switchEnablement()
            }, this));

            this._setButtonText();
            this.model.on("change:enabled", _.bind(this._setButtonText, this));
        },

        _setButtonText: function() {
            if (this.model.getEnabled()) {
                this.setClickToDisableText();
            } else {
                this.setClickToEnableText();
            }
        },

        setClickToEnableText: function() {
            ChromeBrowserAction.setBrowserActionText(MessageManager("actionButtonEnableTitle"));
        },

        setClickToDisableText: function() {
            ChromeBrowserAction.setBrowserActionText(MessageManager("actionButtonDisableTitle"));
        }
    });
});
