define(["TabCollection", "Tab"], function(TabCollection, Tab) {
	module("TabCollection");

	test("Getting Chrome Tabs Returns tab with URL", function() {
		var validTab = {
			url: "Some url",
			crons: [{
				expression: "expression",
				operation: "operation",
                type: "cron"
			}]
		};

		var tabs = [validTab];

        var expectedTabs = [{
            url: "Some url"
        }];
		var collection = new TabCollection(tabs);
		deepEqual(collection.getChromeTabs(), expectedTabs); 
	});

	test("Getting tab by Chrome Tab Id returns correct tab", function() {
        var cronTab1 = {
            url: "Some Url",
			chromeTabId: 1
		};
        
        var cronTab2 = {
            url: "Some other URL",
            chromeTabId: 2
        };

		var collection = new TabCollection([
            cronTab1,
            cronTab2
        ]);

        var chromeTab = collection.getByChromeTabId(1);
		deepEqual(chromeTab.getChromeTabId(), 1); 
	});
});
