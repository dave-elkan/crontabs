module("Tab");
asyncTest("Testing Tab", function() {
	require({baseUrl: "../js"}, ["Tab"], function(Tab) {
		ok(new Tab().toJSON);
		start();
	});
});
