angular.module("crontabs").factory("TimeManagementCompatibilityService", [

    'ScheduleService',
    'TimeManagementTabService',

    function(ScheduleService, TimeManagementTabService) {

        function cronIsOpenOperation(cron) {
            return cron.operation === "show" ||
                   cron.operation === "showAndReload" ||
                   cron.operation === "open";
        }

        function cronIsCloseOperation(cron) {
            return cron.operation === "close";
        }

        function openAndCloseOperationsDefineSingleHoursMinutesAndSeconds(tab) {
            var openOperation = _.find(tab.crons, cronIsOpenOperation);
            var closeOperation = _.find(tab.crons, cronIsCloseOperation);

            return tabOperationDefinesSingleHoursMinutesAndSeconds(openOperation) &&
                tabOperationDefinesSingleHoursMinutesAndSeconds(closeOperation);
        }

        function openOperationDefineSingleHoursMinutesAndSeconds(tab) {
            var openOperation = _.find(tab.crons, cronIsOpenOperation);

            return tabOperationDefinesSingleHoursMinutesAndSeconds(openOperation);
        }

        function tabOperationDefinesSingleHoursMinutesAndSeconds(operation) {

            var schedule = ScheduleService.getScheduleForExpression(operation);

            return schedule.schedules.length === 1 &&
                existsAndContainsOne(schedule.schedules[0].h) &&
                existsAndContainsOne(schedule.schedules[0].m) &&
                existsAndContainsOne(schedule.schedules[0].s);
        }

        function existsAndContainsOne(array) {
            return array && array.length === 1;
        }

        function tabOperationsAreOnSameDays(tab) {
            var open = _.find(tab.crons, cronIsOpenOperation);
            var close = _.find(tab.crons, cronIsCloseOperation);

            var openDays = ScheduleService.getScheduleForExpression(open);
            var closeDays = ScheduleService.getScheduleForExpression(close);

            return openDays.schedules.length && closeDays.schedules.length && _.isEqual(openDays.schedules[0].d, closeDays.schedules[0].d);
        }

        function tabHasOpenAndCloseOperations(tab) {
            var hasOpen = false;
            var hasClose = false;

            tab.crons.forEach(function(cron) {
                if (cronIsOpenOperation(cron)) {
                    hasOpen = true;
                }

                if (cronIsCloseOperation(cron)) {
                    hasClose = true;
                }
            });

            return hasOpen && hasClose;
        }

        function isOpenAndCloseTab(tab) {
            return tab.crons.length === 2 &&
                tabHasOpenAndCloseOperations(tab) &&
                tabOperationsAreOnSameDays(tab) &&
                openAndCloseOperationsDefineSingleHoursMinutesAndSeconds(tab)
        }

        function isOpenOnlyTab(tab) {
            return tab.crons.length === 1 &&
                cronIsOpenOperation(tab.crons[0]) &&
                openOperationDefineSingleHoursMinutesAndSeconds(tab);
        }

        function isCompatibleTab(tab) {
            return isOpenAndCloseTab(tab) || isOpenOnlyTab(tab);
        }

        function getCompatibleTabs(tabs) {

            if (!tabs || !tabs.length) {
                tabs = [];
            }

            tabs = tabs.filter(isCompatibleTab);

            if (!tabs.length) {
                tabs = [TimeManagementTabService.getNewTab()];
            }

            return tabs;
        }

        function getIncompatibleTabs(tabs) {

            if (!tabs || !tabs.length) {
                return [];
            }

            return tabs.filter(function(tab) {
                return !isCompatibleTab(tab);
            });
        }

        return {

            isCompatibleTab: isCompatibleTab,
            getCompatibleTabs: getCompatibleTabs,
            getIncompatibleTabs: getIncompatibleTabs,
            cronIsOpenOperation: cronIsOpenOperation

        };
    }]
);