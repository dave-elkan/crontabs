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
            this.model.on("changed", function(removable) {
                this.$el.find(".remove").toggleClass("hidden", !removable);
            }, this);
		},

		cronRemoved: function(m) {
			this.remove();
		},

		render: function(removable) {
			var html = $(this.template(this.buildRenderableModel(removable)));
			var operation = this.model.getOperation();

			html.find("option[value='" + this.model.getOperation() + "']").attr("selected", true);
			html.find("option[value='" + this.model.getType() + "']").attr("selected", true);

			this.setElement(html);

			return this.$el;
		},

		buildRenderableModel: function(removable) {
			var model = this.model.toJSON();
			model.operations = Operation.getValidOperations();
			model.cid = this.model.cid;
			model.removable = removable;
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
