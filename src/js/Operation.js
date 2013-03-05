define(["brace"], function(Brace) {

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

		validate: function(attrs) {
			if (!this.isValid(attrs)) {
				return chrome.i18n.getMessage("operationInvalid");
			}
		},

		isValid: function(attrs) {
			return _.filter(validOperations, function(operation) {
				return operation.id.toLowerCase() === attrs.name.toLowerCase();
			}).length > 0;
		}
	}, {
		getValidOperations: function() {
			return validOperations;
		}
	});
});
