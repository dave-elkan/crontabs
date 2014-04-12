"use strict";

describe("ChromeTabManager", function() {

    beforeEach(module("crontabs"));

    beforeEach(function() {

        module(function($provide) {
            $provide.value("ChromeTabs", sinon.stub({
                create: function() {},
                get: function() {},
                remove: function() {},
                reload: function() {},
                update: function() {},
                query: function() {},
                onRemoved: function() {}
            }));
        });

        module(function($provide) {
            $provide.value("ChromeWindows", sinon.stub({
                update: function() {}
            }));
        });

    });

    it("should show a tab when it isn't already open", inject(function(ChromeTabManager, ChromeTabs, ChromeWindows) {

        var showAction = ChromeTabManager.getScheduleAction("show");

        var tab = {
            url: "url"
        };

        var chromeTab = {
            id: 1,
            windowId: 2,
            url: "url"
        };

        ChromeTabs.query.callsArg(1);
        ChromeTabs.create.callsArgWith(1, chromeTab);
        ChromeTabs.update.callsArgWith(2, chromeTab);
        ChromeWindows.update.callsArg(2);

        showAction(tab);

        expect(ChromeTabs.update.calledOnce).toBeTruthy();
        expect(ChromeTabs.update.calledWith(chromeTab.id, {
            active: true
        })).toBeTruthy();
        expect(ChromeTabs.create.calledOnce).toBeTruthy();
        expect(ChromeTabs.create.calledWith({
            url: "url",
            active: false
        })).toBeTruthy();
        expect(ChromeWindows.update.calledWith(chromeTab.windowId, {
            focused: true
        })).toBeTruthy();

    }));

    it("should show an existing tab if it already exists", inject(function(ChromeTabManager, ChromeTabs, ChromeWindows) {
        var showAction = ChromeTabManager.getScheduleAction("show");
        var tab = {
            url: "url",
            chromeTabId: 1
        };
        var chromeTab = {
            id: 1,
            windowId: 2,
            url: "url"
        };

        ChromeTabs.get.callsArgWith(1, chromeTab);
        ChromeTabs.update.callsArgWith(2, chromeTab);
        ChromeWindows.update.callsArg(2);

        showAction(tab);

        expect(ChromeTabs.update.calledOnce).toBeTruthy();
        expect(ChromeTabs.update.calledWith(chromeTab.id, {
            active: true
        })).toBeTruthy();
        expect(ChromeTabs.create.notCalled).toBeTruthy();
        expect(ChromeWindows.update.calledWith(chromeTab.windowId, {
            focused: true
        })).toBeTruthy();
    }));

    it("should create, show and reload a non-existant tab", inject(function(ChromeTabManager, ChromeTabs, ChromeWindows) {
        var showAndReloadAction = ChromeTabManager.getScheduleAction("showAndReload");
        var tab = {
            url: "url"
        };
        var chromeTab = {
            id: 1,
            windowId: 2,
            url: "url"
        };

        ChromeTabs.query.callsArg(1);
        ChromeTabs.create.callsArgWith(1, chromeTab);
        ChromeTabs.update.callsArgWith(2, chromeTab);
        ChromeWindows.update.callsArg(2);

        showAndReloadAction(tab);

        expect(ChromeTabs.create.calledOnce).toBeTruthy();
        expect(ChromeTabs.create.calledWith({
            url: "url",
            active: false
        })).toBeTruthy();

        expect(ChromeTabs.update.calledOnce).toBeTruthy();
        expect(ChromeTabs.update.calledWith(chromeTab.id, {
            active: true
        })).toBeTruthy();

        expect(ChromeTabs.reload.calledOnce).toBeTruthy();
        expect(ChromeTabs.reload.calledWith(chromeTab.id)).toBeTruthy();
        expect(ChromeWindows.update.calledWith(chromeTab.windowId, {
            focused: true
        })).toBeTruthy();
    }));

    it("should close an existing tab", inject(function(ChromeTabManager, ChromeTabs, ChromeWindows) {
        var closeAction = ChromeTabManager.getScheduleAction("close");
        var tab = {
            url: "url",
            chromeTabId: 1
        };
        var chromeTab = {
            id: 1,
            windowId: 2,
            url: "url"
        };

        ChromeTabs.get.callsArgWith(1, chromeTab);

        closeAction(tab);

        expect(ChromeTabs.create.notCalled).toBeTruthy();
        expect(ChromeTabs.remove.calledWith(chromeTab.id)).toBeTruthy();
        expect(ChromeWindows.update.notCalled).toBeTruthy();

    }));

    it("should not try to close a non-existant tab", inject(function(ChromeTabManager, ChromeTabs, ChromeWindows) {
        var closeAction = ChromeTabManager.getScheduleAction("close");
        var tab = {
            url: "url"
        };

        var callback = sinon.spy();

        ChromeTabs.query.callsArg(1);

        closeAction(tab, callback);

        expect(ChromeTabs.create.notCalled).toBeTruthy();
        expect(ChromeTabs.remove.notCalled).toBeTruthy();
        expect(callback.calledOnce).toBeTruthy();
        expect(ChromeWindows.update.notCalled).toBeTruthy();

    }));

    it("should reload an existing tab", inject(function(ChromeTabManager, ChromeTabs, ChromeWindows) {
        var reloadAction = ChromeTabManager.getScheduleAction("reload");
        var tab = {
            url: "url",
            chromeTabId: 1
        };
        var chromeTab = {
            id: 1,
            windowId: 2,
            url: "url"
        };

        ChromeTabs.get.callsArgWith(1, chromeTab);
        ChromeTabs.update.callsArgWith(2, chromeTab);

        reloadAction(tab);

        expect(ChromeTabs.create.notCalled).toBeTruthy();

        expect(ChromeTabs.update.notCalled).toBeTruthy();
        expect(ChromeTabs.reload.calledOnce).toBeTruthy();
        expect(ChromeTabs.reload.calledWith(chromeTab.id)).toBeTruthy();
        expect(ChromeWindows.update.notCalled).toBeTruthy();

    }));

    it("should create and reload a non-existing tab", inject(function(ChromeTabManager, ChromeTabs, ChromeWindows) {
        var reloadAction = ChromeTabManager.getScheduleAction("reload");
        var tab = {
            url: "url"
        };
        var chromeTab = {
            id: 1,
            windowId: 2,
            url: "url"
        };

        ChromeTabs.query.callsArg(1);
        ChromeTabs.create.callsArgWith(1, chromeTab);

        reloadAction(tab);

        expect(ChromeTabs.create.calledOnce).toBeTruthy();
        expect(ChromeTabs.create.calledWith({
            url: "url",
            active: false
        })).toBeTruthy();

        expect(ChromeTabs.update.notCalled).toBeTruthy();
        expect(ChromeWindows.update.notCalled).toBeTruthy();
        expect(ChromeTabs.reload.calledOnce).toBeTruthy();
        expect(ChromeTabs.reload.calledWith(chromeTab.id)).toBeTruthy();

    }));

    it("should open a non-existing tab in the background", inject(function(ChromeTabManager, ChromeTabs, ChromeWindows) {
        var reloadAction = ChromeTabManager.getScheduleAction("open");
        var tab = {
            url: "url"
        };
        var chromeTab = {
            id: 1,
            windowId: 2,
            url: "url"
        };

        ChromeTabs.query.callsArg(1);
        ChromeTabs.create.callsArgWith(1, chromeTab);

        reloadAction(tab);

        expect(ChromeTabs.create.calledOnce).toBeTruthy();
        expect(ChromeTabs.create.calledWith({
            url: "url",
            active: false
        })).toBeTruthy();

        expect(ChromeTabs.update.notCalled).toBeTruthy();
        expect(ChromeWindows.update.notCalled).toBeTruthy();

    }));

});
