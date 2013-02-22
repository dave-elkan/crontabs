define(["jquery", "underscore", "brace", "templates"], function($, _, Brace, templates) {
	return Brace.View.extend({
		template: templates.EditTabView,

		render: function() {
			this.$el.html(this.template.render(this.model.toJSON()));
		}
	});
});
