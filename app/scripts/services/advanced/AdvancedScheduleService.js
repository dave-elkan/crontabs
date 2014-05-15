angular.module("crontabs").factory("AdvancedScheduleService", [

    "LaterService",
    "TabStorage",
    "Messaging",
    "TabOperations",
    "TabTriggerTypes",
    "NotFirstOrLastRemovableService",

    function(LaterService,
             TabStorage,
             Messaging,
             TabOperations,
             TabTriggerTypes,
             NotFirstOrLastRemovableService) {

        function getDefaultCronDefinition(type) {
            return {
                type: type,
                expression: "",
                operation: "show"
            }
        }

        return {

            addCronToTab: function(tab) {
                tab.crons.push(getDefaultCronDefinition("cron"));
            },

            addTextExpressionToTab: function(tab) {
                tab.crons.push(getDefaultCronDefinition("text"));
            },

            removeCron: function(tab, cronToRemove) {
                tab.crons = _.filter(tab.crons, function(cron) {
                    return cron !== cronToRemove;
                });
            },

            addTab: function(tabs) {
                tabs.unshift({
                    url: "",
                    crons: [getDefaultCronDefinition("cron")]
                });
            },

            removeTab: function(tabs, tabToRemove) {
                return _.filter(tabs, function(tab) {
                    return tab !== tabToRemove;
                });
            },

            onCronExpressionChanged: function() {
                if (cron.expression) {
                    var spaceCount = cron.expression.split(" ").length;
                    if (spaceCount >= 5 && spaceCount <= 6) {
                        var schedule = LaterService.parse.cron(cron.expression, true);
                        if (schedule.schedules && schedule.schedules.length && _.keys(schedule.schedules[0]).length) {
                            var description = moment(LaterService.schedule(schedule).next(1)).calendar();

                            cron.description = " - Next occurrence " + description;

                            return;
                        }
                    }
                }
                cron.description = "";
            },

            saveSchedule: function(tabs) {
                TabStorage.setTabs(tabs);
                Messaging.sendMessage("saved");

            },

            isRemovable: NotFirstOrLastRemovableService.isRemovable,

            getOperations: function() {
                return TabOperations;
            },

            getTabTriggerTypes: function() {
                return TabTriggerTypes;
            },

            getTabs: function() {
                return TabStorage.getTabsOrNewTab();
            }
        }
    }
]);