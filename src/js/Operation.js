define(["brace", "MessageManager"], function(Brace, MessageManager) {

	var validOperations = [{
			id: "show",
			name: "Show"
		}, {
			id: "reload",
			name: "Reload"
		}, {
			id: "showAndReload",
			name: "Show & Reload"
		}, {
			id: "close",
			name: "Close"
		}];

	return Brace.Model.extend({

		namedAttributes: [
			"id",
			"name"
		],

		validate: function() {
			if (!this.isValid()) {
				return MessageManager("operationInvalid");
			}
		},

		isValid: function() {
			return _.filter(validOperations, function(operation) {
				return operation.id === this.getId();
			}, this).length > 0;
		}
	}, {
		getValidOperations: function() {
			return validOperations;
		}
	});
});
