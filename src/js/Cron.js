define(["underscore", "brace", "MessageManager", "Operation"], function(_, Brace, MessageManager, Operation) {
	return Brace.Model.extend({

		namedAttributes: [
			"expression",
			"operation"
		],

		validate: function(attrs, options) {
			if (!attrs.expression) {
				return MessageManager("cronExpressionInvalid");
			}
		}
	});
});
