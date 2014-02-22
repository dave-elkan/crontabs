angular.module("crontabs").controller("TimeManagementCtrl", function($scope, Messaging, TabStorage, DaysOfWeek, i18nManager) {

    AbstractTabEditorController($scope, TabStorage, i18nManager);

    $scope.DaysOfWeek = DaysOfWeek;

    var incompatibleTabs = [];
    var compatibleTabs = [];

    $scope.tabs.forEach(function(tab) {
        if (tab.crons.length === 2 && tabHasOpenAndCloseOperations(tab) && tabOperationsAreOnSameDays(tab)) {
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
            var result = getScheduleForExpression(cron);
            if (result.schedules && result.schedules.length && result.schedules[0].d && _.contains(result.schedules[0].d, day.num)) {
                tab.days.push(day.num);
            }
        });
    });

    $scope.compatibleTabs.forEach(function(tab) {
        tab.crons.forEach(function(cron) {
            var schedule = getScheduleForExpression(cron);
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

});
