define(["brace", "TabCollection", "ChromeTabCollection", "TabStorage", "ChromeTabManager"], function(
         Brace, TabCollection, ChromeTabCollection, TabStorage, ChromeTabManager) {

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
            this.chromeTabCollection = new ChromeTabCollection();
            this.on("change:enabled", _.bind(this.onEnableChange, this));

            if (this.getEnabled()) {
                this.updateOrCreateTabs()
            }
        },

        toggleEnablement: function() {
            this.setEnabled(!this.getEnabled());
        }, 

        onEnableChange: function() {
            localStorage["crontabsEnabled"] = JSON.stringify(this.getEnabled());
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
                ChromeTabManager.closeTab(cronTab.toChromeTab(), function() {
                    count--;
                    if (count === 0) {
                        callback();
                    }
                });
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
            this.tabCollection.each(function(cronTab, i) {
                var tabProperties = cronTab.toChromeTab();
                tabProperties.active = tabProperties.active || i === 0;
                ChromeTabManager.createTab(tabProperties, _.bind(function(chromeTab) {
                    cronTab.setUrl(chromeTab.url);
                    this.tabCollection.save();
                    this.scheduleTab(cronTab);
                }, this));
            }, this);
        },

        scheduleTab: function(cronTab) {
            cronTab.getCrons().each(function(cron) {
                var l = later(1);
                schedules.push(l);
                var schedule = cronParser().parse(cron.getExpression());
                var action = ChromeTabManager.getScheduleAction(cron.getOperation());
                l.exec(schedule, new Date(), _.bind(function() {
                    if (this.getEnabled()) {
                        action(cronTab.toChromeTab());
                    }
                }, this));
            }, this);
        }
    });
});
