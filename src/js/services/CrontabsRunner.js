angular.module("crontabs").factory("CrontabsRunner", function(ChromeTabs, ChromeTabManager, CrontabsEnabledState, TabStorage, LaterService) {

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

        /**
         * Triggered when crontabs enablement is toggled.
         *
         * When enabled, schedule all tabs.
         * When disabled, stop all schedules and close all tabs.
         *
         * @private
         */
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
         *
         * @private
         */
        _closeAllTabs: function() {
            _.each(this.tabs, function(tab) {
                if (tab.chromeTabId) {
                    ChromeTabManager.closeTab(tab.chromeTabId);
                }
            }, this);
        },

        /**
         * Tabs update handler.
         *
         * Closes all tabs, stops all schedules and schedules new tabs.
         *
         * @param tabs
         * @private
         */
        _onCronsUpdated: function(tabs) {
            this.tabs = tabs;
            this._closeAllTabs();
            this._stopSchedules();
            if (CrontabsEnabledState.isEnabled()) {
                this._scheduleTabs();
            }
        },

        /**
         * Triggered when a tab is removed.
         *
         * Triggered when a tab is manually removed by the user.
         * Triggered when a tab is removed by a schedule.
         *
         * Remoes the chromeTabId property from the tab reference.
         *
         * @param id
         * @private
         */
        _onTabRemoved: function(id) {
            _.each(this.tabs, function(cronTab) {
                if (cronTab.chromeTabId === id) {
                    cronTab.chromeTabId = null;
                }
            });
        },

        /**
         * Clears all schedules.
         *
         * @private
         */
        _stopSchedules: function() {
            _.each(this.intervals, function(interval) {
                interval.clear();
            });
            this.intervals = [];
        },

        /**
         * Schedules all tabs.
         *
         * @private
         */
        _scheduleTabs: function() {
            _.each(this.tabs, this._scheduleTab, this);
        },

        /**
         * Schedules a tab.
         *
         * @param cronTab
         * @private
         */
        _scheduleTab: function(cronTab) {
            _.each(cronTab.crons, function(cron) {
                var expression = cron.expression;
                if (expression && expression != "") {
                    var parser = (cron.type === "text") ? LaterService.parse.text : LaterService.parse.cron;
                    var schedule = parser(expression, true);
                    var action = ChromeTabManager.getScheduleAction(cron.operation);
                    var callback = _.bind(function() {
                        if (CrontabsEnabledState.isEnabled()) {
                            action(cronTab);
                        }
                    }, this);
                    this.intervals.push(LaterService.setInterval(callback, schedule));
                }
            }, this);
        }
    };

    return CrontabsRunner;
});