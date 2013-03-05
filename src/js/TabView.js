define(["jquery", "underscore", "brace", "templates", "CronCollectionView", "Cron"], function($, _, Brace, templates, CronCollectionView, Cron) {
	return Brace.View.extend({

		template: templates.TabView,

		tagName: "form",
		className: "aui",

		events: {
			"input input.url": "setUrl",
			"click .add-cron": "addCron",
		},

		render: function() {
			var html = $(this.template(this.buildRenderableModel()));
			
			new CronCollectionView({
				el: html.find(".crons"),
				model: this.model.getCrons()
			}).render();

			this.$el.html(html);
			
			return this.$el;
		},

		buildRenderableModel: function() {
			var model = this.model.toJSON();
			model.cid = this.model.cid;

			return model;
		},

		// TODO addCron button should only show once first cron is valid
		addCron: function(e) {
			e.preventDefault();
			this.model.getCrons().add({});
		},

		setUrl: function(event) {
			var target = $(event.target);
			var property = target.attr("name");
			var value = target.val();
			this.model.set(property, value);
		}

	});
});
