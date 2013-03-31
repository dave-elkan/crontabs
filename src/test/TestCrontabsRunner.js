define(["underscore", "CrontabsRunner", "ChromeTabs", "CrontabsEnabledState"], function(_, CrontabsRunner, ChromeTabs, CrontabsEnabledState) {
    module("CrontabsRunner",  {
        setup: function() {
            sinon.stub(ChromeTabs);
        },

        teardown: function() {
            _.each(ChromeTabs, function(f) {
                f.restore();
            });

            _.each(CrontabsEnabledState, function(f) {
                if (f.restore) {
                    f.restore();
                }
            });
        }
    });
    
    test("Enabling crontabs schedules tasks", function() {
        // Temp. say it's disabled so we don't try to schedule 
        // in initialize function
        var initStub = sinon.stub(CrontabsEnabledState, "isEnabled").returns(false);
        var runner = new CrontabsRunner();
        initStub.restore();
       
        // Make it look like we're enabled
        sinon.stub(CrontabsEnabledState, "isEnabled").returns(true);
        var scheduleStub = sinon.stub(runner, "_scheduleTabs");
        var stopScheduleStub = sinon.stub(runner, "_stopSchedules");
        CrontabsEnabledState.trigger("change");
        ok(scheduleStub.calledOnce, "Enabling crontabs schedules tasks");
        ok(stopScheduleStub.notCalled, "Enabling crontabs does not disable tasks.");
    });

    test("Disabling crontabs unschedules tasks", function() {
        // Temp. say it's disabled so we don't try to schedule 
        // in initialize function
        var initStub = sinon.stub(CrontabsEnabledState, "isEnabled").returns(false);
        var runner = new CrontabsRunner();
        initStub.restore();

        // Look like we're disabled
        sinon.stub(CrontabsEnabledState, "isEnabled").returns(false);
        var scheduleStub = sinon.stub(runner, "_scheduleTabs");
        var stopScheduleStub = sinon.stub(runner, "_stopSchedules");
        CrontabsEnabledState.trigger("change");
        ok(scheduleStub.notCalled, "Disabling crontabs does not enable tasks.");
        ok(stopScheduleStub.calledOnce, "Disabling crontabs unschedules tasks");
    });

});
