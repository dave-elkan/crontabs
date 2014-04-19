angular.module("crontabs").factory("TimeManagementService", [

        "DaysOfWeek",
        "Messaging",
        "ScheduleService",
        "TabStorage",
        "TimeManagementCompatibilityService",

        function(DaysOfWeek, Messaging, ScheduleService, TabStorage, TimeManagementCompatibilityService) {

            function getNewTab() {
                return {
                    url: "",
                    crons: [{
                        type: "cron",
                        operation: "show",
                        expression: ""
                    }]
                };
            }

            function populateTabDays(tab) {
                var cron = tab.crons[0];
                var result = ScheduleService.getScheduleForExpression(cron);

                tab.days = [];

                DaysOfWeek.forEach(function(day) {
                    if (result.schedules && result.schedules.length && result.schedules[0].d && _.contains(result.schedules[0].d, day.num)) {
                        tab.days.push(day.num);
                    }
                });
            }

            function populateTimes(tab) {
                tab.crons.forEach(function(cron) {
                    var schedule = ScheduleService.getScheduleForExpression(cron);
                    var hour = schedule.schedules[0].h;
                    var minute = schedule.schedules[0].m;

                    if (minute < 10) {
                        minute = "0" + minute;
                    }

                    if (hour < 10) {
                        hour = "0" + hour;
                    }

                    var time = [hour, minute].join(":");

                    if (TimeManagementCompatibilityService.cronIsOpenOperation(cron)) {
                        tab.open = time;
                    } else {
                        tab.close = time;
                    }
                });
            }

            function populateTab(tab) {
                populateTabDays(tab);
                populateTimes(tab);

                return tab;
            }

            function getCronForTimeAndDays(time, days) {
                var segments = time.split(":");
                days = _.map(days, function(day) {
                    return _.find(DaysOfWeek, function(dayOfWeek) {
                        return dayOfWeek.num === day;
                    }).id
                });
                return [0, segments[1], segments[0], "*", "*", days.join(",")].join(" ");
            }

            function buildCron(time, days, operation) {
                return {
                    type: "cron",
                    expression: getCronForTimeAndDays(time, days),
                    operation: operation
                };
            }

            function buildTab(tab) {
                var crons = [buildCron(tab.open, tab.days, "show")];

                if (tab.close) {
                    crons.push(buildCron(tab.close, tab.days, "close"));
                }

                return {
                    url: tab.url,
                    crons: crons
                }
            }

            function buildTabs(compatibleTabs, incompatibleTabs) {
                return incompatibleTabs.concat(compatibleTabs.map(buildTab));
            }

            return {

                getNewTab: getNewTab,

                getTabs: function(tabs) {
                    return {
                        compatible: TimeManagementCompatibilityService.getCompatibleTabs(tabs).map(populateTab),
                        incompatible: TimeManagementCompatibilityService.getIncompatibleTabs(tabs)
                    };
                },

                saveTabs: function(compatibleTabs, incompatibleTabs) {
                    TabStorage.setTabs(buildTabs(compatibleTabs, incompatibleTabs));
                    Messaging.sendMessage("saved");
                }

            };
        }]
);