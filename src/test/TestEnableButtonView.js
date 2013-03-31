define(["underscore", "CrontabsEnabledState", "EnableButtonView"], function(_, CrontabsEnabledState, EnableButtonView) {

    module("EnableButtonView", {
        teardown: function() {
            _.each(EnableButtonView, function(f) {
                if (f.restore) {
                    f.restore();
                }
            });
            
            _.each(CrontabsEnabledState, function(f) {
                if (f.restore) {
                    f.restore();
                }
            });
        }
    });

    test("Click to Disable text is shown when Enabled.", function() {
        var stub = sinon.stub(CrontabsEnabledState, "isEnabled").returns(true);
        var spy = sinon.spy(EnableButtonView, "setClickToDisableText");
        CrontabsEnabledState.trigger("change");
        ok(spy.calledOnce, "Click to Disable text is shown when Enabled.");
    });

    test("Click to Enable text is shown when Disabled.", function() {
        var stub = sinon.stub(CrontabsEnabledState, "isEnabled").returns(false);
        var spy = sinon.spy(EnableButtonView, "setClickToEnableText");
        CrontabsEnabledState.trigger("change");
        ok(spy.calledOnce, "Click to Enabld text is shown when Enabled.");
    });
});
