var CrontabRunner = function(ChromeTabs, ChromeTabManager, CrontabsEnabledState, tabs) {
    this.ChromeTabs = ChromeTabs;
    this.ChromeTabManager = ChromeTabManager;
    this.CrontabsEnabledState = CrontabsEnabledState;
    this.tabs = tabs;
    this.intervals = [];

    ChromeTabs.onRemoved(this._onTabRemoved);
    CrontabsEnabledState.onChange(this._onEnableChange);
};

CrontabRunner.prototype = {

    _onEnableChange: function() {
        if (CrontabsEnabledState.isEnabled()) {
            this._scheduleTabs();
        } else {
            this._stopSchedules();
            this.removeTabs()
        }
    },

    /**
     * Closes all currently opened tabs.
     * @private
     */
    _closeAllTabs: function() {
        _.each(this.tabs, function(tab) {
            if (tab.chromeTabId) {
                this.ChromeTabs.closeTab(tab.chromeTabId);
            }
        }, this);
    },

    onCronsUpdated: function() {
        this._closeAllTabs();
        this._stopSchedules();
        if (this._isEnabled()) {
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
                var action = ChromeTabManager.getScheduleAction(cron.getOperation());
                var callback = _.bind(function() {
                    if (this._isEnabled()) {
                        action(cronTab);
                    }
                }, this);
                this.intervals.push(later.setInterval(callback, schedule));
            }
        }, this);
    },

    _isEnabled: function() {
        return this.CrontabsEnabledState.isEnabled();
    }
};