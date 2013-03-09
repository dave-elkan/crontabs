define(["jquery", "underscore", "brace", "templates", "CronCollectionView", "Cron"], function($, _, Brace, templates, CronCollectionView, Cron) {
	return Brace.View.extend({

		template: templates.TabView,

		tagName: "form",
		className: "aui",

		events: {
			"click .add-cron": "addCron",
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

			this.$el.html(html);
			
			return this.$el;
		},

		buildRenderableModel: function() {
			var model = this.model.toJSON();
			model.cid = this.model.cid;
            model.removable = this.removable;

			return model;
		},

		addCron: function(e) {
			e.preventDefault();
			this.model.getCrons().add({});
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
