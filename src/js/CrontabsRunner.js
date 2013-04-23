define(["underscore", "brace", "TabCollection", "TabStorage", "ChromeTabManager", "ChromeTabs", "CrontabsEnabledState"], function(
         _, Brace, TabCollection, TabStorage, ChromeTabManager, ChromeTabs, CrontabsEnabledState) {

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
                    var l = later(60, true);
                    schedules.push(l);
                    var parser = (cron.getType() === "text") ? enParser : cronParser;
                    var schedule = parser().parse(cron.getExpression());
                    var action = ChromeTabManager.getScheduleAction(cron.getOperation());
                    l.exec(schedule, new Date(), _.bind(function() {
                        if (CrontabsEnabledState.isEnabled()) {
                            action(cronTab);
                        }
                    }, this));
                }
            }, this);
        }
    });
});
