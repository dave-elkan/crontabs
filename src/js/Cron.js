define(["underscore", "brace"], function(_, Brace) {
	return Brace.Model.extend({
		namedAttributes: [
			"expression",
			"operation"
		]
	});
});
