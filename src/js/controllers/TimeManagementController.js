angular.module("crontabs").controller("TimeManagementCtrl", function($scope, Messaging, TabStorage, DaysOfWeek) {

    AbstractTabEditorController($scope, Messaging, TabStorage);

    $scope.DaysOfWeek = DaysOfWeek;

    var compatibleTabs = $scope.tabs.filter(function(tab) {
        return tab.crons.length === 2 && tabHasOpenAndCloseOperations(tab) && tabOperationsAreOnSameDays(tab);
    });

    if (!compatibleTabs.length) {
        compatibleTabs.push({
            url: ""
        });
    }

    $scope.compatibleTabs = compatibleTabs;

    $scope.dayIsSelected = function(tab, day) {
        if (tab.crons.length) {
            var result = getScheduleForExpression(tab.crons[0]);
            if (result.schedules && result.schedules.length && result.schedules[0].d && _.contains(result.schedules[0].d, day)) {
                return true;
            }
        }

        return false;
    };

    function tabOperationsAreOnSameDays(tab) {
        var open = _.find(tab.crons, function(cron) {
            return cron.operation === "show" || cron.operation === "showAndReload" ;
        });

        var close = _.find(tab.crons, function(cron) {
            return cron.operation === "close";
        });

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
            if (cron.operation === "show" || cron.operation === "showAndReload") {
                hasOpen = true;
            }

            if (cron.operation === "close") {
                hasClose = true;
            }
        });

        return hasOpen && hasClose;
    }

    function getCronForDaysAndTime(days, time) {
        var cron = [0, time.minute, time.hour, "*", "*", days.join(",")];
        return cron.join(" ");
    }

    function buildTab(tab) {
        return {
            url: tab.url,
            crons: [

            ]
        }
    }

    function buildTabs() {
        return $scope.tabs.map($scope.tabs, buildTab);
    }

    $scope.onSubmit = function() {
        TabStorage.setTabs(buildTabs());
        Messaging.sendMessage("saved");
        $scope.editor.$setPristine();
    };

});
