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

    });

    it("should show a tab when it isn't already open", inject(function(ChromeTabManager, ChromeTabs) {

        var showAction = ChromeTabManager.getScheduleAction("show");

        var tab = {
            url: "url"
        };

        var chromeTab = {
            id: 1,
            url: "url"
        };

        ChromeTabs.query.callsArgWith(1, undefined);
        ChromeTabs.create.callsArgWith(1, chromeTab);

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
    }));

    it("should show an existing tab if it already exists", inject(function(ChromeTabManager, ChromeTabs) {
        var showAction = ChromeTabManager.getScheduleAction("show");
        var tab = {
            url: "url",
            chromeTabId: 1
        };
        var chromeTab = {
            id: 1,
            url: "url"
        };

        ChromeTabs.get.callsArgWith(1, chromeTab);

        showAction(tab);

        expect(ChromeTabs.update.calledOnce).toBeTruthy();
        expect(ChromeTabs.update.calledWith(chromeTab.id, {
            active: true
        })).toBeTruthy();
        expect(ChromeTabs.create.notCalled).toBeTruthy();
    }));

    it("should create, show and reload a non-existant tab", inject(function(ChromeTabManager, ChromeTabs) {
        var showAndReloadAction = ChromeTabManager.getScheduleAction("showAndReload");
        var tab = {
            url: "url"
        };
        var chromeTab = {
            id: 1,
            url: "url"
        };

        ChromeTabs.query.callsArgWith(1, undefined);
        ChromeTabs.create.callsArgWith(1, chromeTab);
        ChromeTabs.update.callsArgWith(2, chromeTab);

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

    }));

    it("should close an existing tab", inject(function(ChromeTabManager, ChromeTabs) {
        var closeAction = ChromeTabManager.getScheduleAction("close");
        var tab = {
            url: "url",
            chromeTabId: 1
        };
        var chromeTab = {
            id: 1,
            url: "url"
        };

        ChromeTabs.get.callsArgWith(1, chromeTab);

        closeAction(tab);

        expect(ChromeTabs.create.notCalled).toBeTruthy();
        expect(ChromeTabs.remove.calledWith(chromeTab.id)).toBeTruthy();

    }));

    it("should not try to close a non-existant tab", inject(function(ChromeTabManager, ChromeTabs) {
        var closeAction = ChromeTabManager.getScheduleAction("close");
        var tab = {
            url: "url"
        };

        var callback = sinon.spy();

        ChromeTabs.query.callsArgWith(1, undefined);

        closeAction(tab, callback);

        expect(ChromeTabs.create.notCalled).toBeTruthy();
        expect(ChromeTabs.remove.notCalled).toBeTruthy();
        expect(callback.calledOnce).toBeTruthy();

    }));

    it("should reload an existing tab", inject(function(ChromeTabManager, ChromeTabs) {
        var reloadAction = ChromeTabManager.getScheduleAction("reload");
        var tab = {
            url: "url",
            chromeTabId: 1
        };
        var chromeTab = {
            id: 1,
            url: "url"
        };

        ChromeTabs.get.callsArgWith(1, chromeTab);
        ChromeTabs.update.callsArgWith(2, chromeTab);

        reloadAction(tab);

        expect(ChromeTabs.create.notCalled).toBeTruthy();

        expect(ChromeTabs.update.notCalled).toBeTruthy();
        expect(ChromeTabs.reload.calledOnce).toBeTruthy();
        expect(ChromeTabs.reload.calledWith(chromeTab.id)).toBeTruthy();

    }));

    it("should create and reload a non-existing tab", inject(function(ChromeTabManager, ChromeTabs) {
        var reloadAction = ChromeTabManager.getScheduleAction("reload");
        var tab = {
            url: "url"
        };
        var chromeTab = {
            id: 1,
            url: "url"
        };

        ChromeTabs.query.callsArgWith(1, undefined);
        ChromeTabs.create.callsArgWith(1, chromeTab);

        reloadAction(tab);

        expect(ChromeTabs.create.calledOnce).toBeTruthy();
        expect(ChromeTabs.create.calledWith({
            url: "url",
            active: false
        })).toBeTruthy();

        expect(ChromeTabs.update.notCalled).toBeTruthy();
        expect(ChromeTabs.reload.calledOnce).toBeTruthy();
        expect(ChromeTabs.reload.calledWith(chromeTab.id)).toBeTruthy();

    }));

    it("should open a non-existing tab in the background", inject(function(ChromeTabManager, ChromeTabs) {
        var reloadAction = ChromeTabManager.getScheduleAction("open");
        var tab = {
            url: "url"
        };
        var chromeTab = {
            id: 1,
            url: "url"
        };

        ChromeTabs.query.callsArgWith(1, undefined);
        ChromeTabs.create.callsArgWith(1, chromeTab);

        reloadAction(tab);

        expect(ChromeTabs.create.calledOnce).toBeTruthy();
        expect(ChromeTabs.create.calledWith({
            url: "url",
            active: false
        })).toBeTruthy();

        expect(ChromeTabs.update.notCalled).toBeTruthy();
    }));

});
