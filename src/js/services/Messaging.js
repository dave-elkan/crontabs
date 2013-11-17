angular.module("crontabs").factory("Messaging", function() {
    return {
        sendMessage: chrome.extension.sendMessage,
        onMessage: chrome.extension.onMessage
    }
});