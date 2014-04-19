describe("TimeManagementCompatibilityService", function() {

    beforeEach(module("crontabs"));

    it("should find a tab with a show and close operation on the same days to be valid", inject(function(TimeManagementCompatibilityService) {

        var tab = {
            crons: [{
                operation: "show",
                type: "cron",
                expression: "0 30 12 * * MON-FRI *"
            }, {
                operation: "close",
                type: "cron",
                expression: "0 40 12 * * MON-FRI *"
            }]
        };

        expect(TimeManagementCompatibilityService.isCompatibleTab(tab)).toBeTruthy();
    }));

    it("should find a tab with a show and close operation on the different days to be invalid", inject(function(TimeManagementCompatibilityService) {

        var tab = {
            crons: [{
                operation: "show",
                type: "cron",
                expression: "0 30 12 * * MON-TUE *"
            }, {
                operation: "close",
                type: "cron",
                expression: "0 40 12 * * MON-THU *"
            }]
        };

        expect(TimeManagementCompatibilityService.isCompatibleTab(tab)).toBeFalsy();
    }));

    it("should find a tab with only a close operation to be invalid", inject(function(TimeManagementCompatibilityService) {

        var tab = {
            crons: [{
                operation: "close",
                type: "cron",
                expression: "0 40 12 * * MON-THU *"
            }]
        };

        expect(TimeManagementCompatibilityService.isCompatibleTab(tab)).toBeFalsy();
    }));

    it("should find a tab with only a show operation to be valid", inject(function(TimeManagementCompatibilityService) {

        var tab = {
            crons: [{
                operation: "show",
                type: "cron",
                expression: "0 40 12 * * MON-THU *"
            }]
        };

        expect(TimeManagementCompatibilityService.isCompatibleTab(tab)).toBeTruthy();
    }));

});