define(function() {
	return {
		get: function() {
            var crontabs = localStorage["crontabs"];
            if (crontabs) {
                return JSON.parse(crontabs);
            } else {
                return [{}];
            }
		},

		set: function(crontabs) {
			localStorage["crontabs"] = JSON.stringify(crontabs);
		}
	}
});
