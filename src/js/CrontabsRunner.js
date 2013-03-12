define(["brace", "TabCollection", "TabStorage", "TabManager", "MessageManager", "CrontabsEnabler"], function(Brace, TabCollection, TabStorage, TabManager, MessageManager, CrontabsEnabler) {

    return Brace.Model.extend({
        namedEvents: [
            "cronsUpdated",
            "enablementChanged"
        ],

        namedAttributes: [
            "enabled"
        ],

        initialize: function() {
            this.onCronsUpdated(_.bind(this.cronsUpdated, this));
            this.tabCollection = new TabCollection();
            //this.tabCollection.on("reset", _.bind(this.updateOrCreateTabs, this));
            this.on("change:enabled", _.bind(this.onEnableChange, this));
        },

        switchEnablement: function() {
            this.setEnabled(!this.getEnabled());
        }, 

        onEnableChange: function() {
            if (this.getEnabled()) {
                this.updateOrCreateTabs();
            } else {
                this.removeTabs()
            }
        },

        removeTabs: function() {
            later().stopExec();
            this.tabCollection.each(function(cronTab) {
                TabManager.getTab(cronTab.getUrl(), function(chromeTab) {
                    TabManager.closeTab(chromeTab);
                });
            });
        },

        cronsUpdated: function() {
            later().stopExec();
            this.tabCollection.reset(TabStorage.get());
        },

        updateOrCreateTabs: function() {
            this.tabCollection.reset(TabStorage.get());
            this.tabCollection.each(function(cronTab) {
                TabManager.createTab(cronTab.toChromeTab(), _.bind(function(chromeTab) {
                    cronTab.setUrl(chromeTab.url);
                    this.tabCollection.save();
                    this.scheduleTab(cronTab, chromeTab);
                }, this));
            }, this);
        },

        scheduleTab: function(cronTab, chromeTab) {
            cronTab.getCrons().each(function(cron) {
                var schedule = cronParser().parse(cron.getExpression());
                var action = TabManager.getScheduleAction(cron.getOperation());
                later().exec(schedule, new Date(), _.bind(function() {
                    if (this.getEnabled()) {
                        action(chromeTab);
                    }
                }, this));
            }, this);
        }
    });
});
