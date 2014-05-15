angular.module("crontabs").controller("TimeManagementCtrl", [
    '$scope',
    'DaysOfWeek',
    'i18nManager',
    'TimeManagementService',
    'TimeManagementTabService',

function($scope,
         DaysOfWeek,
         i18nManager,
         TimeManagementService,
         TimeManagementTabService) {

    $scope.i18nManager = i18nManager;
    $scope.isRemovable = TimeManagementService.isRemovable;
    $scope.tabs = TimeManagementService.getTabs();

    $scope.DaysOfWeek = DaysOfWeek;

    $scope.compatibleTabs = $scope.tabs.compatible;

    $scope.removeTab = function(tabToRemove) {
        $scope.compatibleTabs = TimeManagementService.removeTab($scope.compatibleTabs, tabToRemove);
        $scope.editor.$setDirty();
    };

    $scope.isDayRequired = function(tab) {
        return !tab.days || tab.days.length === 0;
    };

    $scope.addTab = function() {
        TimeManagementService.addTab($scope.compatibleTabs);
        $scope.editor.$setDirty();
    };

    $scope.onSubmit = function() {
        TimeManagementService.saveTabs($scope.compatibleTabs, $scope.tabs.incompatible);
        $scope.editor.$setPristine();
    }

}]);
