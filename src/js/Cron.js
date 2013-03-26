define(["underscore", "brace", "MessageManager", "Operation"], function(_, Brace, MessageManager, Operation) {
	return Brace.Model.extend({

		namedAttributes: [
			"expression",
			"operation",
            "type"
		],

        defaults: {
            "operation": "show",
            "type": "cron"
        },

		validate: function(attrs, options) {
			if (!attrs.expression) {
				return MessageManager("cronExpressionInvalid");
			}
		}
	});
});
