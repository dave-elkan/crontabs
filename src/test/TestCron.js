require(["Cron"], function(Cron) {
	module("Cron");

	test("Operation type validation", function() {
		var invalidCronOperation = "Invalid Cron validation";
		var validCronOperation = "show";

		ok(!Cron.operationIsValid(invalidCronOperation), "Invalid cron is invalid");
		ok(Cron.operationIsValid(validCronOperation), "valid cron is invalid");
	});
});
