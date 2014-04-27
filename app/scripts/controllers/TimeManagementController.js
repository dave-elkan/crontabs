angular.module("crontabs").controller("TimeManagementCtrl", [
    '$scope',
    'Messaging',
    'TabStorage',
    'DaysOfWeek',
    'i18nManager',
    'TimeManagementService',
    'TimeManagementTabService',

function($scope,
         Messaging,
         TabStorage,
         DaysOfWeek,
         i18nManager,
         TimeManagementService,
         TimeManagementTabService) {

    AbstractTabEditorController($scope, TabStorage, i18nManager);

    $scope.DaysOfWeek = DaysOfWeek;

    var tabs = TimeManagementService.getTabs($scope.tabs);

    $scope.compatibleTabs = tabs.compatible;

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

    $scope.isDayRequired = function(tab) {
        return !tab.days || tab.days.length === 0;
    };

    $scope.addTab = function() {
        $scope.compatibleTabs.unshift(TimeManagementTabService.getNewTab());
    };

    $scope.onSubmit = function() {
        TimeManagementService.saveTabs($scope.compatibleTabs, tabs.incompatible);
        $scope.editor.$setPristine();
    }

}]);
