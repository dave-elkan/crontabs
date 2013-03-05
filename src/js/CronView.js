define(["brace", "jquery", "templates", "Cron", "Operation"], function(Brace, $, templates, Cron, Operation) {
	return Brace.View.extend({

		template: templates.CronView,

		className: "field-group cron",

		events: {
			"input input[name='expression']": "expressionChanged",
			"change select": "actionChanged"
		},

		initialize: function() {
			this.model.on("remove", this.cronRemoved, this);
		},

		cronRemoved: function(m) {
			this.remove();
		},

		render: function(i) {
			var html = $(this.template(this.buildRenderableModel(i)));
			var operation = this.model.getOperation();

			html.find("option[value='" + this.model.getOperation() + "']").attr("selected", true);

			this.$el.html(html);

			return this.$el;
		},

		buildRenderableModel: function(i) {
			var model = this.model.toJSON();
			model.operations = Operation.getValidOperations();
			model.cid = this.model.cid;
			model.removable = (i !== 0);

			return model;
		},

		expressionChanged: function(e) {
			this.model.set('expression', $(e.target).val(), {
				validate: true
			});
		},

		actionChanged: function(e) {
			this.model.set('operation', $(e.target).val(), {
				validate: true
			});
		}
	});
});
