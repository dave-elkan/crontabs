define(function() {
    return {
        onEnableButtonClicked: function(callback) {
            chrome.browserAction.onClicked.addListener(callback);
        },

        setBrowserActionText: function(text) {
            chrome.browserAction.setTitle({
                title: text
            });
        }
    };
});
