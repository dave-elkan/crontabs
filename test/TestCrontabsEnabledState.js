"use strict";

describe("CrontabsEnabledState", function() {

    beforeEach(module("crontabs"));

    beforeEach(function() {
        module(function($provide) {
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

        });
    });

   it("should return true when crontabs is enabled", inject(function(CrontabsEnabledState, webStorage) {
       webStorage.get.returns(true);
       expect(CrontabsEnabledState.isEnabled()).toBeTruthy();
   }));

   it("should be false when crontabs is disabled", inject(function(CrontabsEnabledState, webStorage) {
       webStorage.get.returns(false);
       expect(CrontabsEnabledState.isEnabled()).toBeFalsy();
   }));

   it("will toggle the enabled state to enabled from true to false", inject(function(CrontabsEnabledState, webStorage) {
       webStorage.get.returns(true);
       CrontabsEnabledState.onChange(function(enabled) {
           expect(enabled).toBeFalsy();
       });
       CrontabsEnabledState.toggleEnabled();
   }));

   it("will toggle the enabled state to enabled from false to true", inject(function(CrontabsEnabledState, webStorage) {
        webStorage.get.returns(false);
        CrontabsEnabledState.onChange(function(enabled) {
            expect(enabled).toBeTruthy();
        });
        CrontabsEnabledState.toggleEnabled();
   }));

});
