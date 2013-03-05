define(["brace"], function(Brace, TabCollection, EditTabView) {
	return Brace.Router.extend({
		routes: {
			"background.html": "background",
			"editor.html": "editor"
		}
	});
});
