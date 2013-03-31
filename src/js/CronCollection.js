define(["brace", "Cron"], function(Brace, Cron) {
	return Brace.Collection.extend({
		model: Cron,

        initialize: function() {
            this.on("add remove", this._onChanged, this);

            if (!this.length) {
                this.add(new Cron());
            }
        },

        _onChanged: function() {
            this.each(function(model) {
                model.trigger("changed", this.length > 1);
            }, this);
        }
	});
});
