angular.module("crontabs").factory("TabTriggerTypes", function() {
    return [{
        id: "cron",
        name: "Cron"
    }, {
        id: "text",
        name: "Text"
    }]
});