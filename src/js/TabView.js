define(["jquery", "underscore", "brace", "templates", "CronCollectionView", "Cron"], function($, _, Brace, templates, CronCollectionView, Cron) {
	return Brace.View.extend({

		template: templates.TabView,

		events: {
			"click .addSchedule": "addSchedule",
            "input .url": "updateUrl"
		},

        initialize: function(model, options) {
            this.removable = options.removable;
        },

		render: function() {
			var html = $(this.template(this.buildRenderableModel()));
			
			new CronCollectionView({
				el: html.find(".crons"),
				model: this.model.getCrons()
			}).render();

            this.setElement(html);
			
			return this.$el;
		},

		buildRenderableModel: function() {
			var model = this.model.toJSON();
			model.cid = this.model.cid;
            model.removable = this.removable;

			return model;
		},

		addSchedule: function(e) {
			e.preventDefault();
            var type = $(e.target).data("type");
			this.model.getCrons().add({
                type: type
            });
		},

        updateUrl: function(e) {
            var urlField = $(e.target);
            var errorField = this.$el.find(".error");
            this.model.setUrl(urlField.val(), {
                validate: true
            });

            if (this.model.validationError) {
                errorField.text(this.model.validationError);
                errorField.removeClass("hidden")
            } else {
                errorField.addClass("hidden")
            }
        }
	});
});
