var services = angular.module("crontabs.service", []);

services.factory("ChromeTabs", function() {
    return {
        create: chrome.tabs.create,
        get: chrome.tabs.get,
        remove: chrome.tabs.remove,
        reload: chrome.tabs.reload,
        update: chrome.tabs.update,
        query: chrome.tabs.query,
        onRemoved: function(callback) {
            chrome.tabs.onRemoved.addListener(callback);
        }
    }
});

services.factory("Messaging", function() {
    return {
        sendMessage: chrome.extension.sendMessage,
        onMessage: chrome.extension.onMessage
    }
});

services.factory("CrontabsEnabledState", function() {
    return {

    };
});