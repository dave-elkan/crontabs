angular.module("crontabs").factory("TabOperations", function() {
    return [{
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
});