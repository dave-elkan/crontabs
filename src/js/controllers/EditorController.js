angular.module("crontabs").controller("EditorCtrl", function($scope, Messaging, TabStorage, TabOperations, TabTriggerTypes, i18nManager) {

    AbstractTabEditorController($scope, TabStorage, i18nManager);

    $scope.operations = TabOperations;

    $scope.types = TabTriggerTypes;

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

    $scope.removeTab = function(tabToRemove) {
        if ($scope.tabs.length > 1) {
            var tabs = [];
            $scope.tabs.forEach(function(tab) {
                if (tab !== tabToRemove) {
                    tabs.push(tab);
                }
            });

            $scope.tabs = tabs;
            $scope.editor.$setDirty();
        }
    };

    $scope.addTab = function() {
        $scope.tabs.unshift({
            url: "",
            crons: [{
                type: "cron",
                operation: "show",
                expression: ""
            }]
        });
    };

    $scope.onChangeOperation = function(cron, operation) {
        cron.operation = operation.id;
    };

    $scope.onSubmit = function() {
        TabStorage.setTabs(angular.copy($scope.tabs));
        Messaging.sendMessage("saved");
        $scope.editor.$setPristine();
    };
});