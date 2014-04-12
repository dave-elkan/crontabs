angular.module("crontabs").factory("TabOperations", [
    'i18nManager',
function(i18nManager) {
    return {
        "close": i18nManager("tabActionClose"),
        "reload": i18nManager("tabActionReload"),
        "show": i18nManager("tabActionShow"),
        "showAndReload": i18nManager("tabActionShowAndReload")
    };
}]);