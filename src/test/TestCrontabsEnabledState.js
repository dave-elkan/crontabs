require(["CrontabsEnabledState"], function(CrontabsEnabledState) {
   test("string 'true' is enabled", function() {
       equal(CrontabsEnabledState.valueIsEnabled("true"), true);
   });

   test("string 'false' is disabled", function() {
       equal(CrontabsEnabledState.valueIsEnabled("false"), false);
   });

   test("undefined is disabled", function() {
       equal(CrontabsEnabledState.valueIsEnabled(undefined), false);
   });

   test("null is disabled", function() {
       equal(CrontabsEnabledState.valueIsEnabled(null), false);
   });

   test("nothing (undefined) is disabled", function() {
       equal(CrontabsEnabledState.valueIsEnabled(), false);
   });

   test("Strange string is disabled", function() {
       equal(CrontabsEnabledState.valueIsEnabled("asdasd"), false);
   });
});
