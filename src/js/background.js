angular.module("crontabs").run(function(CrontabsRunner, LaterService, EnableButton) {
    new CrontabsRunner();
    LaterService.date.localTime();
});