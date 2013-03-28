define(["brace", "CronView"], function(Brace, CronView) {
	return Brace.View.extend({
	
		events: {
			"click button.remove": "removeCron"
		},

		initialize: function() {
			this.model.on("add", this.cronAdded, this);
		},

		render: function() {

			var html = this.model.map(function(cron, i) {
                return this._renderCron(cron);
			}, this);

            this.$el.append(html);

			return this.$el;
		},

		cronAdded: function(cron) {
			var html = this._renderCron(cron);
			this.$el.append(html);
			html.find("input:first").focus();
		},

        _renderCron: function(cron) {
            return new CronView({
                model: cron
            }).render(this.model.length > 1);
        },
		
		removeCron: function(e) {
			e.preventDefault();
			var cid = $(e.target).data("cid");
			var cron = this.model.get(cid);
			this.model.remove(cron);
			this.$el.find("input:last").focus();
		}

	});
});
