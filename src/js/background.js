angular.module("crontabs").run(function(CrontabsRunner, LaterService, ChromeAlarmService, EnableButton) {

    var ALARM_KEY = "crontabsReschedule";

    var runner = new CrontabsRunner();
    LaterService.date.localTime();

    ChromeAlarmService.create(ALARM_KEY, {
        periodInMinutes: 2.1
    });

    ChromeAlarmService.onAlarm.addListener(function(alarm) {
        if (alarm && alarm.name === ALARM_KEY) {
            runner.rescheduleTabs();
        }
    });
});