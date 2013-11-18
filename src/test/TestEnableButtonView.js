
"use strict";

describe("EnableButton", function() {

    beforeEach(module("crontabs"));

    beforeEach(function() {

        module(function($provide) {
            $provide.value("ChromeBrowserAction", sinon.stub({
                setBrowserActionText: function() {},
                onEnableButtonClicked: function() {}
            }));

            $provide.value("i18nManager", sinon.stub());
        });
    });

    it("should show 'Click to Disable' text when crontabs is enabled.", inject(function(EnableButton) {
        var spy = sinon.spy(EnableButton, "_setClickToDisableText");
        EnableButton.onEnablementChanged(true);
        expect(spy.calledOnce).toBeTruthy();
    }));

    it("should show 'Click to Enable' text when crontabs is disabled.", inject(function(EnableButton) {
        var spy = sinon.spy(EnableButton, "_setClickToEnableText");
        EnableButton.onEnablementChanged(false);
        expect(spy.calledOnce).toBeTruthy();
    }));
});
