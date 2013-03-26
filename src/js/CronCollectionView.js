define(["brace", "CronView"], function(Brace, CronView) {
	return Brace.View.extend({
	
		events: {
			"click .cron": "removeCron"
		},

		initialize: function() {
			this.model.on("add", this.cronAdded, this);
		},

		render: function() {
			this.model.each(function(cron, i) {
				var cronView = new CronView({
					model: cron
				});

				this.$el.append(cronView.render(i));
			}, this);

			return this.$el;
		},

		cronAdded: function(model) {
			var cron = new CronView({
				model: model
			}).render();
			this.$el.append(cron);
			cron.find("input:first").focus();
		},
		
		removeCron: function(e) {
			e.preventDefault();
			var cid = $(e.target).data("cid");
			var cron = this.model.get(cid);
			this.model.remove(cron);
			this.$el.find(".cron:last input:first").focus();
		}

	});
});
