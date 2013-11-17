angular.module("crontabs").factory("EnableButton", function(ChromeBrowserAction, MessageManager, CrontabsEnabledState) {

    function EnableButton() {
        CrontabsEnabledState.onChange(_.bind(this.onEnablementChanged, this));
        ChromeBrowserAction.onEnableButtonClicked(function() {
            CrontabsEnabledState.toggleEnabled();
        });
    }

    EnableButton.prototype = {

        onEnablementChanged: function(enabled) {
            if (enabled) {
                this._setClickToDisableText();
            } else {
                this._setClickToEnableText();
            }
        },

        _setClickToEnableText: function() {
            ChromeBrowserAction.setBrowserActionText({
                badgeText: MessageManager("actionButtonBadgeDisabledText"),
                titleText: MessageManager("actionButtonEnableTitle"),
                badgeBackgroundColour: "#FF0000"
            });
        },

        _setClickToDisableText: function() {
            ChromeBrowserAction.setBrowserActionText({
                badgeText: MessageManager("actionButtonBadgeEnabledText"),
                titleText: MessageManager("actionButtonDisableTitle"),
                badgeBackgroundColour: "#458B00"
            });
        }
    };

    return EnableButton;
});
