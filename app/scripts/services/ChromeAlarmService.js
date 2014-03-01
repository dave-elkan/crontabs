angular.module("crontabs").factory("ChromeAlarmService", function() {
    return {
        create: chrome.alarms.create,
        get: chrome.alarms.get,
        onAlarm: chrome.alarms.onAlarm
    }
});