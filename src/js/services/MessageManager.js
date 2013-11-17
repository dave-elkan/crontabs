angular.module("crontabs").factory("MessageManager", function() {
    return function(key) {
        return chrome.i18n.getMessage(key);
    }
});
