define(["brace", "ChromeBrowserAction", "MessageManager", "CrontabsEnabledState"], function(Brace, ChromeBrowserAction, MessageManager, CrontabsEnabledState) {
    
    var EnableButtonView = Brace.Model.extend({

        initialize: function() {
            ChromeBrowserAction.onEnableButtonClicked(_.bind(function() {
                CrontabsEnabledState.toggleEnablement()
            }, this));

            this._setButtonText();
            this.listenTo(CrontabsEnabledState, "change", this._setButtonText, this);
        },

        _setButtonText: function() {
            if (CrontabsEnabledState.isEnabled()) {
                this.setClickToDisableText();
            } else {
                this.setClickToEnableText();
            }
        },

        setClickToEnableText: function() {
            ChromeBrowserAction.setBrowserActionText({
                badgeText: MessageManager("actionButtonBadgeDisabledText"), 
                titleText: MessageManager("actionButtonEnableTitle"),
                badgeBackgroundColour: "#FF0000"
            });
        },

        setClickToDisableText: function() {
            ChromeBrowserAction.setBrowserActionText({
                badgeText: MessageManager("actionButtonBadgeEnabledText"),
                titleText: MessageManager("actionButtonDisableTitle"),
                badgeBackgroundColour: "#458B00"
            }); 
        }
    });

    return new EnableButtonView();
});
