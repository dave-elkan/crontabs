define(["brace", "MessageManager"], function(Brace, MessageManager) {
    return Brace.View.extend({

        initialize: function() {
            var instance = this;
            chrome.browserAction.onClicked.addListener(function() {
                instance.model.switchEnablement();
            });

            if (this.model.getEnabled()) {
                this.setClickToDisableText();
            } else {
                this.setClickToEnableText();
            }

            this.model.on("change:enabled", _.bind(this._setButtonText, this));
        },

        _setButtonText: function(model, isEnabled) {
            if (isEnabled) {
                this.setClickToDisableText();
            } else {
                this.setClickToEnableText();
            }
        },

        setClickToEnableText: function() {
            chrome.browserAction.setTitle({
                title: MessageManager("actionButtonEnableTitle")
            });
        },

        setClickToDisableText: function() {
            chrome.browserAction.setTitle({
                title: MessageManager("actionButtonDisableTitle") 
            });
        }
    });
});
