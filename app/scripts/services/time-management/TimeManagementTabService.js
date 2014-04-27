angular.module("crontabs").factory("TimeManagementTabService",

    function() {
        return {
            getNewTab: function() {
                return {
                    url: "",
                    crons: [{
                        type: "cron",
                        operation: "show",
                        expression: ""
                    }]
                };
            }
        }
    }
);