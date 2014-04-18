angular.module("crontabs").factory("TimeManagementService",
    function() {

        function cronIsOpenOperation(cron) {
            return cron.operation === "show" ||
                   cron.operation === "showAndReload" ||
                   cron.operation === "open";
        }

        function cronIsCloseOperation(cron) {
            return cron.operation === "close";
        }

        function tabOperationsDefineSingleHoursMinutesAndSeconds(tab) {
            var open = _.find(tab.crons, cronIsOpenOperation);
            var close = _.find(tab.crons, cronIsCloseOperation);

            var openDays = getScheduleForExpression(open);
            var closeDays = getScheduleForExpression(close);

            return openDays.schedules.length &&
                closeDays.schedules.length &&
                existsAndContainsOne(openDays.schedules[0].h) &&
                existsAndContainsOne(openDays.schedules[0].m) &&
                existsAndContainsOne(openDays.schedules[0].s) &&
                existsAndContainsOne(closeDays.schedules[0].h) &&
                existsAndContainsOne(closeDays.schedules[0].m) &&
                existsAndContainsOne(closeDays.schedules[0].s);
        }

        function existsAndContainsOne(array) {
            return array && array.length === 1;
        }

        function tabOperationsAreOnSameDays(tab) {
            var open = _.find(tab.crons, cronIsOpenOperation);
            var close = _.find(tab.crons, cronIsCloseOperation);

            var openDays = getScheduleForExpression(open);
            var closeDays = getScheduleForExpression(close);

            return openDays.schedules.length && closeDays.schedules.length && _.isEqual(openDays.schedules[0].d, closeDays.schedules[0].d);
        }

        function getScheduleForExpression(cron) {
            if (cron.type === "cron") {
                return later.parse.cron(cron.expression, true);
            } else {
                return later.parse.text(cron.expression, true);
            }
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
                tabOperationsDefineSingleHoursMinutesAndSeconds(tab)
        }

        function isOpenOnlyTab(tab) {
            return tab.crons.length === 1 &&
                cronIsOpenOperation(tab.crons[0]);
        }

        return {

            isCompatibleTab: function(tab) {
                return isOpenAndCloseTab(tab) || isOpenOnlyTab(tab);
            },

            getScheduleForExpression: getScheduleForExpression

        };
    }
);