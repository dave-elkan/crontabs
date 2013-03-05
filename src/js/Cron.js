define(["underscore", "brace"], function(_, Brace) {
	return Brace.Model.extend({
		namedAttributes: [
			"expression",
			"operation"
		],

		validate: function(attrs, options) {
			if (!attrs.expression) {
				return chrome.i18n.getMessage("cronExpressionInvalid");
			}
		
			if (!attrs.operation || !this.operationIsValid(attrs.operation)) {
				return chrome.i18n.getMessage("cronOperationInvalid");
			}
		}
	});
});
