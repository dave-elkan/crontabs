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
                this._scheduleTabs()
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
                this._scheduleTabs();
            } else {
                this._stopSchedules();
                this.removeTabs()
            }
        },

        removeTabs: function(callback) {
            var count = this.tabCollection.length;
            this.tabCollection.each(function(cronTab) {
                var chromeTabId = cronTab.getChromeTabId();
                if (chromeTabId) {
                    ChromeTabManager.closeTab(chromeTabId, function() {
                        if (--count === 0 && callback) {
                            callback();
                        }
                    });
                }
            });
        },

        cronsUpdated: function() {
            this.removeTabs(_.bind(function() {
                this._scheduleTabs();
            }, this));
        },

        _stopSchedules: function() {
            _.each(schedules, function(schedule) {
                schedule.stopExec();
            });
        },

        _scheduleTabs: function() {
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
