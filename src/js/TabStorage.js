define(function() {
	return {
		get: function() {
			return JSON.parse(localStorage["crontabs"]);
		},

		set: function(crontabs) {
			localStorage["crontabs"] = JSON.stringify(crontabs);
		}
	}
});
