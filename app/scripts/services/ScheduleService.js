angular.module("crontabs").factory("ScheduleService", [

        "LaterService",

        function(LaterService) {

            return {

                getScheduleForExpression: function(cron) {
                    if (cron.type === "cron") {
                        return LaterService.parse.cron(cron.expression, true);
                    } else {
                        return LaterService.parse.text(cron.expression, true);
                    }
                }

            };
        }]
);