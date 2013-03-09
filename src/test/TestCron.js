define(["Cron"], function(Cron) {
	module("Cron");

	test("Cron validation", function() {
		var invalidCronOperation = "Invalid Cron validation";
		var validCronOperation = "show";

        var cron = new Cron();

		equal(cron.validate({
            expression: "",
        }), "cronExpressionInvalid", "Invalid cron is invalid");

        equal(cron.validate({
            expression: "asd"
        }), undefined, "valid cron is invalid");
	});
});
