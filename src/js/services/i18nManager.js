angular.module("crontabs").factory("i18nManager", function() {
    return function(key) {
        return chrome.i18n.getMessage(key);
    }
});
