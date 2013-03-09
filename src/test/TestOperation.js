require(["Operation"], function(Operation) {
	module("Operation", {
		  setup: function() {
			  
		  }, 
		  teardown: function() {
		  
		  }
	});

	test("Operation type validation", function() {
		var invalidCronOperation = new Operation({
			id: "Invalid Cron validation"
		});
		var validCronOperation = new Operation({
			id: "show"
		});

		// This looks wrong, but validate returns a string if validation fails.
		ok(invalidOperation.validate(), "Invalid Operation is invalid");

		// And returns undefined if valid
		ok(!validOperation.validate(), "Valid Operation is valid");
	});
});
