define(["underscore", "brace", "TabCollection", "TabStorage", "ChromeTabManager", "ChromeTabs"], function(
         _, Brace, TabCollection, TabStorage, ChromeTabManager, ChromeTabs) {

    var schedules = [];
    
    return Brace.Model.extend({
        namedEvents: [
            "cronsUpdated"
        ],

        namedAttributes: [
            "enabled"
        ],

        initialize: function() {
            this.onCronsUpdated(_.bind(this.cronsUpdated, this));
            this.tabCollection = new TabCollection();
            this.on("change:enabled", _.bind(this.onEnableChange, this));

            if (this.getEnabled()) {
                this.updateOrCreateTabs()
            }

            ChromeTabs.onRemoved.addListener(_.bind(function(id, props) {
                var cronTab = this.tabCollection.getByChromeTabId(id);
                if (cronTab) {
                    cronTab.setChromeTabId(null);
                }
            }, this));
        },

        toggleEnablement: function() {
            this.setEnabled(!this.getEnabled());
        }, 

        onEnableChange: function() {
            if (this.getEnabled()) {
                this.updateOrCreateTabs();
            } else {
                this.removeTabs()
            }
        },

        removeTabs: function(callback) {
            this._stopSchedules();
            var count = this.tabCollection.length;
            this.tabCollection.each(function(cronTab) {
                var chromeTabId = cronTab.getChromeTabId();
                if (cronTabId) {
                    ChromeTabManager.closeTab(chromeTabId, function() {
                        if (--count === 0) {
                            callback();
                        }
                    });
                }
            });
        },

        cronsUpdated: function() {
            this.removeTabs(_.bind(function() {
                this.updateOrCreateTabs();
            }, this));
        },

        _stopSchedules: function() {
            _.each(schedules, function(schedule) {
                schedule.stopExec();
            });
        },

        updateOrCreateTabs: function() {
            this.tabCollection.reset(TabStorage.get());
            this.tabCollection.each(_.bind(this.scheduleTab, this));
        },

        scheduleTab: function(cronTab, chromeTab) {
            cronTab.getCrons().each(function(cron) {
                var l = later(1);
                schedules.push(l);
                var schedule = cronParser().parse(cron.getExpression());
                var action = ChromeTabManager.getScheduleAction(cron.getOperation());
                l.exec(schedule, new Date(), _.bind(function() {
                    if (this.getEnabled()) {
                        action(cronTab);
                    }
                }, this));
            }, this);
        }
    });
});
