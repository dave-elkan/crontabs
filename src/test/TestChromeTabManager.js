require(["underscore", "ChromeTabManager", "ChromeTabs", "Tab"], function(_, ChromeTabManager, ChromeTabs, Tab) {
    module("ChromeTabManager", {
        setup: function() {
            sinon.stub(ChromeTabs);
        },

        teardown: function() {
            _.each(ChromeTabs, function(f) {
                f.restore();
            });
        }
    });

    test("Showing a non-existant tab creates and shows it", function() {
        var showAction = ChromeTabManager.getScheduleAction("show");
        var tab = new Tab({
            url: "url"
        });
        var chromeTab = {
            id: 1,
            url: "url"
        };

        ChromeTabs.query.callsArgWith(1, undefined); 
        ChromeTabs.create.callsArgWith(1, chromeTab);
        
        showAction(tab);
        
        ok(ChromeTabs.update.calledOnce, "Update is called once");
        ok(ChromeTabs.update.calledWith(chromeTab.id, {
            active: true,
            url: "url"
        }),"Chrome tab is updated with active:true flag"); 
        ok(ChromeTabs.create.calledOnce, "Chrome Tab created when it doesn't exist.");
        ok(ChromeTabs.create.calledWith({
            url: "url"
        }), "Chrome Tab created when it doesn't exist.");
    });

    test("Showing an existant tab shows it", function() {
        var showAction = ChromeTabManager.getScheduleAction("show");
        var tab = new Tab({
            url: "url",
            chromeTabId: 1
        });
        var chromeTab = {
            id: 1,
            url: "url"
        };

        ChromeTabs.get.callsArgWith(1, chromeTab); 
        
        showAction(tab);
        
        ok(ChromeTabs.update.calledOnce, "Update is called once");
        ok(ChromeTabs.update.calledWith(chromeTab.id, {
            active: true,
            url: "url"
        }),"Chrome tab is updated with active:true flag"); 
        ok(ChromeTabs.create.notCalled, "Chrome Tab is not created when one exists.");
    });

    test("Showing and Reloading a non-existant tab, creates it, shows it and reloads it", function() {
        var showAndReloadAction = ChromeTabManager.getScheduleAction("showAndReload");
        var tab = new Tab({
            url: "url"
        });
        var chromeTab = {
            id: 1,
            url: "url"
        };

        ChromeTabs.query.callsArgWith(1, undefined); 
        ChromeTabs.create.callsArgWith(1, chromeTab);
        ChromeTabs.update.callsArgWith(2, chromeTab);
        
        showAndReloadAction(tab);
        
        ok(ChromeTabs.create.calledOnce, "Chrome Tab created when it doesn't exist.");
        ok(ChromeTabs.create.calledWith({
            url: "url"
        }), "Chrome Tab created when it doesn't exist.");

        ok(ChromeTabs.update.calledOnce, "Update is called once");
        ok(ChromeTabs.update.calledWith(chromeTab.id, {
            active: true,
            url: "url"
        }),"Chrome tab is updated with active:true flag");

        ok(ChromeTabs.reload.calledOnce, "Reload is called once");
        ok(ChromeTabs.reload.calledWith(chromeTab.id), "Reload is called with the correct chrome tab.");

    });

    test("Showing and Reloading an existing tab shows it and reloads it", function() {
        var showAndReloadAction = ChromeTabManager.getScheduleAction("showAndReload");
        var tab = new Tab({
            url: "url",
            chromeTabId: 1
        });
        var chromeTab = {
            id: 1,
            url: "url"
        };

        ChromeTabs.get.callsArgWith(1, chromeTab);
        ChromeTabs.update.callsArgWith(2, chromeTab);
        
        showAndReloadAction(tab);
        
        ok(ChromeTabs.create.notCalled, "Chrome Tab is not created when it exists.");

        ok(ChromeTabs.update.calledOnce, "Update is called once");
        ok(ChromeTabs.update.calledWith(chromeTab.id, {
            active: true,
            url: "url"
        }),"Chrome tab is updated with active:true flag");

        ok(ChromeTabs.reload.calledOnce, "Reload is called once");
        ok(ChromeTabs.reload.calledWith(chromeTab.id), "Reload is called with the correct chrome tab.");

    });

    test("Closing an existing tab closes it", function() {
        var closeAction = ChromeTabManager.getScheduleAction("close");
        var tab = new Tab({
            url: "url",
            chromeTabId: 1
        });
        var chromeTab = {
            id: 1,
            url: "url"
        };

        ChromeTabs.get.callsArgWith(1, chromeTab);
        
        closeAction(tab);
        
        ok(ChromeTabs.create.notCalled, "Chrome Tab is not created.");
        ok(ChromeTabs.remove.calledWith(chromeTab.id), "Remove is called with the correct chrome tab.");

    });
   
    test("Closing a non-existant tab doesn't create tab just to close it again.", function() {
        var closeAction = ChromeTabManager.getScheduleAction("close");
        var tab = new Tab({
            url: "url"
        });

        var callback = sinon.spy();

        ChromeTabs.query.callsArgWith(1, undefined);
        
        closeAction(tab, callback);
        
        ok(ChromeTabs.create.notCalled, "Chrome Tab is not created just to close it again.");
        ok(ChromeTabs.remove.notCalled, "Remove is not called to close non-existant tab.");
        ok(callback.calledOnce, "Callback called once.");

    });

    test("Reloading an existing tab shows it and reloads it", function() {
        var reloadAction = ChromeTabManager.getScheduleAction("reload");
        var tab = new Tab({
            url: "url",
            chromeTabId: 1
        });
        var chromeTab = {
            id: 1,
            url: "url"
        };

        ChromeTabs.get.callsArgWith(1, chromeTab);
        ChromeTabs.update.callsArgWith(2, chromeTab);
        
        reloadAction(tab);
        
        ok(ChromeTabs.create.notCalled, "Chrome Tab is not created when it exists.");

        ok(ChromeTabs.update.notCalled, "Update is not called");
        ok(ChromeTabs.reload.calledOnce, "Reload is called once");
        ok(ChromeTabs.reload.calledWith(chromeTab.id), "Reload is called with the correct chrome tab.");

    });

    test("Reloading a non-existant tab creates it and reloads it", function() {
        var reloadAction = ChromeTabManager.getScheduleAction("reload");
        var tab = new Tab({
            url: "url"
        });
        var chromeTab = {
            id: 1,
            url: "url"
        };

        ChromeTabs.query.callsArgWith(1, undefined); 
        ChromeTabs.create.callsArgWith(1, chromeTab);
        
        reloadAction(tab);
        
        ok(ChromeTabs.create.calledOnce, "Chrome Tab created when it doesn't exist.");
        ok(ChromeTabs.create.calledWith({
            url: "url"
        }), "Chrome Tab created when it doesn't exist.");

        ok(ChromeTabs.update.notCalled, "Update is not called");
        ok(ChromeTabs.reload.calledOnce, "Reload is called once");
        ok(ChromeTabs.reload.calledWith(chromeTab.id), "Reload is called with the correct chrome tab.");

    });

});
