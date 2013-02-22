define(["underscore", "brace", "Cron"], function(_, Brace, Cron) {
	return Brace.Collection.extend({
		model: Cron
	});
});
