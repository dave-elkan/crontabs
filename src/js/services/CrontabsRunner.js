angular.module("crontabs").factory("CrontabsRunner", function(ChromeTabs, ChromeTabManager, CrontabsEnabledState, TabStorage) {

    var CrontabsRunner = function() {
        this.tabs = TabStorage.getTabs();
        this.intervals = [];

        ChromeTabs.onRemoved(_.bind(this._onTabRemoved, this));
        CrontabsEnabledState.onChange(_.bind(this._onEnableChange, this));
        TabStorage.onChange(_.bind(this._onCronsUpdated, this));

        if (CrontabsEnabledState.isEnabled()) {
            this._scheduleTabs();
        }
    };

    CrontabsRunner.prototype = {

        _onEnableChange: function() {
            if (CrontabsEnabledState.isEnabled()) {
                this._scheduleTabs();
            } else {
                this._stopSchedules();
                this._closeAllTabs();
            }
        },

        /**
         * Closes all currently opened tabs.
         * @private
         */
        _closeAllTabs: function() {
            _.each(this.tabs, function(tab) {
                if (tab.chromeTabId) {
                    ChromeTabManager.closeTab(tab.chromeTabId);
                }
            }, this);
        },

        _onCronsUpdated: function(tabs) {
            this.tabs = tabs;
            this._closeAllTabs();
            this._stopSchedules();
            if (CrontabsEnabledState.isEnabled()) {
                this._scheduleTabs();
            }
        },

        _onTabRemoved: function(id) {
            _.each(this.tabs, function(cronTab) {
                if (cronTab.chromeTabId === id) {
                    cronTab.chromeTabId = null;
                }
            });
        },

        _stopSchedules: function() {
            _.each(this.intervals, function(interval) {
                interval.clear();
            });
            this.intervals = [];
        },

        _scheduleTabs: function() {
            _.each(this.tabs, this._scheduleTab, this);
        },

        _scheduleTab: function(cronTab) {
            _.each(cronTab.crons, function(cron) {
                var expression = cron.expression;
                if (expression && expression != "") {
                    var parser = (cron.type === "text") ? later.parse.text : later.parse.cron;
                    var schedule = parser(expression, true);
                    var action = ChromeTabManager.getScheduleAction(cron.operation);
                    var callback = _.bind(function() {
                        if (CrontabsEnabledState.isEnabled()) {
                            action(cronTab);
                        }
                    }, this);
                    this.intervals.push(later.setInterval(callback, schedule));
                }
            }, this);
        }
    };

    return CrontabsRunner;
});