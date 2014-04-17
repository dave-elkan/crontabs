angular.module("crontabs").controller("TimeManagementCtrl", [
    '$scope',
    'Messaging',
    'TabStorage',
    'DaysOfWeek',
    'i18nManager',
    'TimeManagementService',

function($scope, Messaging, TabStorage, DaysOfWeek, i18nManager, TimeManagementService) {

    AbstractTabEditorController($scope, TabStorage, i18nManager);

    $scope.DaysOfWeek = DaysOfWeek;

    var incompatibleTabs = [];
    var compatibleTabs = [];

    $scope.tabs.forEach(function(tab) {
        if (TimeManagementService.isCompatibleTab(tab)) {
            compatibleTabs.push(tab);
        } else {
            incompatibleTabs.push(tab);
        }
    });

    if (!compatibleTabs.length) {
        compatibleTabs = TabStorage.getEmptyTabList();
    }

    $scope.compatibleTabs = compatibleTabs;

    $scope.compatibleTabs.forEach(function(tab) {
        var cron = tab.crons[0];
        if (!tab.days) {
            tab.days = [];
        }
        DaysOfWeek.forEach(function(day) {
            var result = TimeManagementService.getScheduleForExpression(cron);
            if (result.schedules && result.schedules.length && result.schedules[0].d && _.contains(result.schedules[0].d, day.num)) {
                tab.days.push(day.num);
            }
        });
    });

    $scope.compatibleTabs.forEach(function(tab) {
        tab.crons.forEach(function(cron) {
            var schedule = TimeManagementService.getScheduleForExpression(cron);
            var hour = schedule.schedules[0].h;
            var minute = schedule.schedules[0].m;

            if (minute < 10) {
                minute = "0" + minute;
            }

            if (hour < 10) {
                hour = "0" + hour;
            }

            var time = [hour, minute].join(":");

            if (cron.operation === "show" || cron.operation === "showAndReload") {
                tab.open = time;
            } else {
                tab.close = time;
            }
        });
    });

    $scope.removeTab = function(tabToRemove) {
        if ($scope.compatibleTabs.length > 1) {
            var tabs = [];
            $scope.compatibleTabs.forEach(function(tab) {
                if (tab !== tabToRemove) {
                    tabs.push(tab);
                }
            });

            $scope.compatibleTabs = tabs;
            $scope.editor.$setDirty();
        }
    };

    $scope.addTab = function() {
        $scope.compatibleTabs.unshift({
            url: "",
            crons: [{
                type: "cron",
                operation: "show",
                expression: ""
            }, {
                type: "cron",
                operation: "close",
                expression: ""
            }]
        });
    };

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
        return {
            url: tab.url,
            crons: [
                buildCron(tab.open, tab.days, "show"),
                buildCron(tab.close, tab.days, "close")
            ]
        }
    }

    function buildTabs() {
        return incompatibleTabs.concat($scope.compatibleTabs.map(buildTab));
    }

    $scope.onSubmit = function() {
        TabStorage.setTabs(buildTabs());
        Messaging.sendMessage("saved");
        $scope.editor.$setPristine();
    };

}]);
