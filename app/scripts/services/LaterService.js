angular.module("crontabs").factory("LaterService", function() {
    window.later.date.localTime()
    return window.later;
});