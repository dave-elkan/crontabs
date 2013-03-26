define(["brace", "jquery", "templates", "Cron", "Operation", "MessageManager"], function(Brace, $, templates, Cron, Operation, MessageManager) {
	return Brace.View.extend({

		template: templates.CronView,

		events: {
			"input input[name='expression']": "expressionChanged",
			"change select.type": "typeChanged",
			"change select.operation": "operationChanged"
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
			html.find("option[value='" + this.model.getType() + "']").attr("selected", true);

			this.setElement(html);

			return this.$el;
		},

		buildRenderableModel: function(i) {
			var model = this.model.toJSON();
			model.operations = Operation.getValidOperations();
			model.cid = this.model.cid;
			model.removable = (i !== 0);
            model.type = (model.type === "text") ? MessageManager("cronTypeText") : MessageManager("cronTypeCron");

			return model;
		},

		expressionChanged: function(e) {
			this.model.set('expression', $(e.target).val(), {
				validate: true
			});

            var error = this.$el.find(".error");
            if (this.model.validationError) {
                error.text(this.model.validationError);
                error.removeClass("hidden");
            } else {
                error.addClass("hidden");
            }
		},

		typeChanged: function(e) {
			this.model.set('type', $(e.target).val())
		},

		operationChanged: function(e) {
			this.model.set('operation', $(e.target).val());
		}
	});
});
