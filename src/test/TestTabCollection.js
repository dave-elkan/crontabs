define(["TabCollection"], function(TabCollection) {
	module("TabCollection");

	test("Invalid tabs are not returned", function() {
		var validTab = {
			url: "Some url",
			crons: [{
				expression: "expression",
				operation: "operation" 
			}]
		};

		var invalidTab = {
			crons: [{
				expression: "expression",
				operation: "operation"
			}]
		};
		
		var tabs = [validTab, invalidTab];
		var collection = new TabCollection(tabs);
		ok(collection.getValidTabs().length === 1, "There is one valid tab");
		deepEqual(collection.getValidTabs()[0].toJSON(), validTab, "There is one valid tab");
	});
});
