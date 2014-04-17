describe("TimeManagementService", function() {

    beforeEach(module("crontabs"));

    it("should find a tab with a show and close operation on the same days to be valid", inject(function(TimeManagementService) {

        var singleDayOpenCloseTab = {
            crons: [{
                operation: "show",
                type: "cron",
                expression: "0 30 12 * * MON *"
            }, {
                operation: "close",
                type: "cron",
                expression: "0 40 12 * * MON *"
            }]
        };

        expect(TimeManagementService.isCompatibleTab(singleDayOpenCloseTab)).toBeTruthy();
    }));

});