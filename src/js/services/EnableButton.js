angular.module("crontabs").factory("EnableButton", function(ChromeBrowserAction, i18nManager, CrontabsEnabledState) {

    function EnableButton() {
        this.onEnablementChanged(CrontabsEnabledState.isEnabled());
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
                badgeText: i18nManager("actionButtonBadgeDisabledText"),
                titleText: i18nManager("actionButtonEnableTitle"),
                badgeBackgroundColour: "#d04437"
            });
        },

        _setClickToDisableText: function() {
            ChromeBrowserAction.setBrowserActionText({
                badgeText: i18nManager("actionButtonBadgeEnabledText"),
                titleText: i18nManager("actionButtonDisableTitle"),
                badgeBackgroundColour: "#14892c"
            });
        }
    };

    return new EnableButton();
});
