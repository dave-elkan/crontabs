define(function() {
    return {
        onEnableButtonClicked: function(callback) {
            chrome.browserAction.onClicked.addListener(callback);
        },

        setBrowserActionText: function(options) {
            chrome.browserAction.setBadgeText({
                text: options.badgeText
            });
            chrome.browserAction.setTitle({
                title: options.titleText
            });
            chrome.browserAction.setBadgeBackgroundColor({
                color: options.badgeBackgroundColour
            });
        }
    };
});
