function AbstractTabEditorController($scope, TabStorage, i18nManager) {

    $scope.i18nManager = i18nManager;

    $scope.tabs = TabStorage.getTabsOrNewTab();

    $scope.isRemovable = function(first, length) {
        return !first || length > 1;
    };

}