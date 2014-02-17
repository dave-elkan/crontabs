function AbstractTabEditorController($scope, TabStorage) {

    $scope.tabs = TabStorage.getTabsOrNewTab();

    $scope.isRemovable = function(first, length) {
        return !first || length > 1;
    };

}