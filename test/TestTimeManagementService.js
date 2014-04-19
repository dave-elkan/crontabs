describe("TimeManagementService", function() {

    beforeEach(module("crontabs"));

    beforeEach(function() {
        module(function($provide) {

            $provide.value("i18nManager", sinon.stub());

            $provide.value("Messaging", sinon.stub({
                sendMessage: function() {},
                onMessage: {
                    addListener: function() {}
                }
            }));
        });
    });


    it("should populate compatible tabs with days property for open and close tab", inject(function(TimeManagementService) {

        var tabs = [{
            crons: [{
                operation: "show",
                type: "cron",
                expression: "0 30 12 * * MON-FRI *"
            }, {
                operation: "close",
                type: "cron",
                expression: "0 40 12 * * MON-FRI *"
            }]
        }];

        var expectedDays = [2, 3, 4, 5, 6];

        expect(TimeManagementService.getTabs(tabs).compatible[0].days).toEqual(expectedDays);
    }));

    it("should populate compatible tabs with days property for open only tab", inject(function(TimeManagementService) {

        var tabs = [{
            crons: [{
                operation: "showAndReload",
                type: "cron",
                expression: "0 30 12 * * MON,WED,SAT *"
            }]
        }];

        var expectedDays = [2, 4, 7];

        expect(TimeManagementService.getTabs(tabs).compatible[0].days).toEqual(expectedDays);
    }));

    it("should populate compatible tab with open property for open only tab", inject(function(TimeManagementService) {

        var tabs = [{
            crons: [{
                operation: "showAndReload",
                type: "cron",
                expression: "0 30 12 * * MON,WED,SAT *"
            }]
        }];

        var expectedOpenTime = "12:30";

        expect(TimeManagementService.getTabs(tabs).compatible[0].open).toEqual(expectedOpenTime);
    }));

    it("should populate compatible tab with open and close properties for open and close tab", inject(function(TimeManagementService) {

        var tabs = [{
            crons: [{
                operation: "open",
                type: "cron",
                expression: "0 31 12 * * MON-FRI *"
            }, {
                operation: "close",
                type: "cron",
                expression: "0 40 12 * * MON-FRI *"
            }]
        }];

        var expectedOpenTime = "12:31";
        var expectedCloseTime = "12:40";

        expect(TimeManagementService.getTabs(tabs).compatible[0].open).toEqual(expectedOpenTime);
        expect(TimeManagementService.getTabs(tabs).compatible[0].close).toEqual(expectedCloseTime);
    }));

    it("should create padded zero times for minutes less than 10", inject(function(TimeManagementService) {

        var tabs = [{
            crons: [{
                operation: "open",
                type: "cron",
                expression: "0 9 12 * * MON-FRI *"
            }]
        }];

        var expectedOpenTime = "12:09";

        expect(TimeManagementService.getTabs(tabs).compatible[0].open).toEqual(expectedOpenTime);
    }));

    it("should create padded zero times for hours less than 10", inject(function(TimeManagementService) {

        var tabs = [{
            crons: [{
                operation: "open",
                type: "cron",
                expression: "0 9 2 * * MON-FRI *"
            }]
        }];

        var expectedOpenTime = "02:09";

        expect(TimeManagementService.getTabs(tabs).compatible[0].open).toEqual(expectedOpenTime);
    }));


});