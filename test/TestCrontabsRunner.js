"use strict";

describe("CrontabsRunner", function() {

    beforeEach(module("crontabs"));

    beforeEach(function() {

        module(function($provide) {
            $provide.value("ChromeTabs", sinon.stub({
                create: function() {},
                get: function() {},
                remove: function() {},
                reload: function() {},
                update: function() {},
                query: function() {},
                onRemoved: function() {}
            }));

            $provide.value("ChromeWindows", sinon.stub({
                update: function() {}
            }));

            $provide.value("webStorage", sinon.stub({
                get: function() {},
                add: function() {}
            }));

            $provide.value("Messaging", sinon.stub({
                sendMessage: function() {},
                onMessage: {
                    addListener: function() {}
                }
            }));

            $provide.value("ChromeTabManager", sinon.stub({
                closeTab: function() {},
                getScheduleAction: function() {}
            }));

            $provide.value("LaterService", sinon.stub({
                setInterval: function() {},
                parse: {
                    text: function() {},
                    cron: function() {}
                }
            }));
        });
    });
    
    it("should schedules tasks when crontabs is enabled", inject(function(CrontabsRunner, CrontabsEnabledState, webStorage) {
        webStorage.get.returns([{
            id: "a-tab"
        }]);

        // Temporarily mock return for webStorage to false to prevent scheduling on init
        webStorage.get.returns(false);
        var runner = new CrontabsRunner();
        // Reset the return type to true
        webStorage.get.returns(true);

        var scheduleStub = sinon.stub(runner, "_scheduleTabs");
        var stopSchedulesStub = sinon.stub(runner, "_stopSchedules");

        CrontabsEnabledState.toggleEnabled();
        expect(scheduleStub.calledOnce).toBeTruthy();
        expect(stopSchedulesStub.notCalled).toBeTruthy();
    }));

    it("should unschedule tasks when crontabs is disabled", inject(function(CrontabsRunner, CrontabsEnabledState, webStorage) {
        webStorage.get.withArgs("crontabs").returns([{
            id: "a-tab"
        }]);

        // Temporarily mock return for webStorage to false to prevent scheduling on init
        webStorage.get.withArgs("crontabsEnabled").returns(false);
        var runner = new CrontabsRunner();
        // Reset the return type to true
        webStorage.get.withArgs("crontabsEnabled").returns(true);

        // Look like we're disabled
        sinon.stub(CrontabsEnabledState, "isEnabled").returns(false);
        var scheduleStub = sinon.stub(runner, "_scheduleTabs");
        var stopSchedulesStub = sinon.stub(runner, "_stopSchedules");

        CrontabsEnabledState.toggleEnabled();
        expect(scheduleStub.notCalled).toBeTruthy();
        expect(stopSchedulesStub.calledOnce).toBeTruthy();
    }));

    it("should close all tabs and scheduled new tasks when tab details are updated", inject(function(CrontabsRunner, ChromeTabManager, webStorage) {
        // Temporarily mock return for webStorage to false to prevent scheduling on init
        webStorage.get.returns(false);
        var runner = new CrontabsRunner();
        // Reset the return type to true
        webStorage.get.returns(true);

        var scheduleStub = sinon.stub(runner, "_scheduleTabs");
        var stopSchedulesStub = sinon.stub(runner, "_stopSchedules");

        runner._onCronsUpdated([{
            id: "a-tab",
            chromeTabId: "chrome-tab-id"
        }]);

        expect(ChromeTabManager.closeTab.calledWith("chrome-tab-id")).toBeTruthy();
        expect(ChromeTabManager.closeTab.calledOnce).toBeTruthy();
        expect(stopSchedulesStub.calledOnce).toBeTruthy();
        expect(scheduleStub.calledOnce).toBeTruthy();
    }));

    it("should push a later interval when scheduling a tab", inject(function(CrontabsRunner, ChromeTabManager, webStorage, LaterService) {
        // Temporarily mock return for webStorage to false to prevent scheduling on init
        webStorage.get.returns(false);
        var runner = new CrontabsRunner();
        // Reset the return type to true
        webStorage.get.returns(true);

        var action = function() {};
        ChromeTabManager.getScheduleAction.returns(action);

        var interval = {
            value: "An interval"
        };

        LaterService.setInterval.returns(interval);

        runner._scheduleTab({
            id: "a-tab",
            url: "a url",
            crons: [{
                expression: "expression",
                type: "text"
            }]
        });

        expect(runner.intervals).toEqual([interval]);
    }));
});
