function AbstractTabEditorController($scope, TabStorage) {

    $scope.tabs = TabStorage.getTabsOrNewTab();

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

    $scope.isRemovable = function(first, length) {
        return !first || length > 1;
    };

}