angular.module("crontabs").factory("ChromeWindows", function() {
    return {
        update: chrome.windows.update
    }
});