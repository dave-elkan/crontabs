"use strict";

function TabCtrl($scope) {

    $scope.operations = [{
        id: "show",
        name: "Show"
    }, {
        id: "reload",
        name: "Reload"
    }, {
        id: "showAndReload",
        name: "Show & Reload"
    }, {
        id: "close",
        name: "Close"
    }];

    $scope.types = [{
        id: "cron",
        name: "Cron"
    }, {
        id: "text",
        name: "Text"
    }];

    $scope.tabs = [{
        "url":"http://dailyjs.com",
        "crons": [{
            "type": "cron",
            "operation": "show",
            "expression": "45 9 * * MON-FRI"
        }],
        unremovable: true
    }];

    $scope.addCron = function(tab) {
        tab.crons.push({
            type: "cron",
            expression: "",
            operation: $scope.operations[0].id
        })
    };

    $scope.addTextExpression = function(tab) {
        tab.crons.push({
            type: "text",
            expression: "",
            operation: $scope.operations[0].id
        })
    };

    $scope.isRemovable = function(first, length) {
        return !first || length > 1;
    };

    $scope.removeCron = function(tab, cronToRemove) {
        var crons = [];
        var tabsCrons = tab.crons;
        if (tabsCrons.length > 1) {
            tabsCrons.forEach(function(cron) {
                if (cron !== cronToRemove) {
                    crons.push(cron);
                }
            });
            tab.crons = crons;
        }
    };

    $scope.onChangeOperation = function(cron, operation) {
        cron.operation = operation.id;
    };

    $scope.removeTab = function(tabToRemove) {
        if ($scope.tabs.length > 1) {
            var tabs = [];
            $scope.tabs.forEach(function(tab) {
                if (tab !== tabToRemove) {
                    tabs.push(tab);
                }
            });

            $scope.tabs = tabs;
        }
    };

    $scope.addTab = function() {
        $scope.tabs.push({
            url: "",
            crons: [{
                url: "",
                type: "cron",
                operation: "show",
                expression: ""
            }]
        });
    };

    $scope.onSubmit = function() {
        debugger
    };
}