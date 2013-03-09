define(["brace"], function(Brace) {
	return Brace.Router.extend({
		routes: {
			"background.html": "background",
			"editor.html": "editor"
		}
	});
});
