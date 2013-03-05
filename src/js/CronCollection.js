define(["brace", "Cron"], function(Brace, Cron) {
	return Brace.Collection.extend({
		model: Cron
	});
});
