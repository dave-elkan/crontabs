define(["brace", "Cron"], function(Brace, Cron) {
	return Brace.Collection.extend({
		model: Cron,

        initialize: function() {
            this.on("add remove", this._onChanged, this);
        },

        _onChanged: function() {
            this.each(function(model) {
                model.trigger("changed", this.length > 1);
            }, this);
        }
	});
});
