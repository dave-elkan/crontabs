define(["underscore", "brace", "later", "TabCollection", "TabStorage", "ChromeTabManager", "ChromeTabs", "CrontabsEnabledState"], function(
         _, Brace, later, TabCollection, TabStorage, ChromeTabManager, ChromeTabs, CrontabsEnabledState) {

    var schedules = [];
    
    return Brace.Model.extend({
        namedEvents: [
            "cronsUpdated"
        ],

        initialize: function() {
            this.onCronsUpdated(_.bind(this.cronsUpdated, this));
            this.tabCollection = new TabCollection();
            this.listenTo(CrontabsEnabledState, "change", this.onEnableChange, this);

            if (CrontabsEnabledState.isEnabled()) {
                this._scheduleTabs();
            }

            ChromeTabs.onRemoved(_.bind(function(id, props) {
                var cronTab = this.tabCollection.getByChromeTabId(id);
                if (cronTab) {
                    cronTab.setChromeTabId(null);
                }
            }, this));
        },

        onEnableChange: function() {
            if (CrontabsEnabledState.isEnabled()) {
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
            this.removeTabs();
            this._stopSchedules();
            if (CrontabsEnabledState.isEnabled()) {
                this._scheduleTabs();
            }
        },

        _stopSchedules: function() {
            _.each(schedules, function(schedule) {
                schedule.stopExec();
            });
            schedules = [];
        },

        _scheduleTabs: function() {
            this.tabCollection.reset(TabStorage.get());
            this.tabCollection.each(_.bind(this.scheduleTab, this));
        },

        scheduleTab: function(cronTab, chromeTab) {
            cronTab.getCrons().each(function(cron) {
                if (cron.getExpression() && cron.getExpression() != "") {
                    later.date.UTC();

                    var parser = (cron.getType() === "text") ? later.parse.text : later.parse.cron;
                    var schedule = parser(cron.getExpression(), true);
                    var action = ChromeTabManager.getScheduleAction(cron.getOperation());
                    var callback = _.bind(function() {
                        if (CrontabsEnabledState.isEnabled()) {
                            action(cronTab);
                        }
                    }, this);
                    var interval = later.setInterval(callback, schedule);
                    schedules.push(interval);
                }
            }, this);
        }
    });
});
