angular.module("crontabs").factory("TabStorage", [
    'webStorage',
    'Messaging',
function(webStorage, Messaging) {

    var callbacks = [];

    function TabStorage() {
        Messaging.onMessage.addListener(_.bind(function(message) {
            if (message === "saved") {
                this.broadcast();
            }
        }, this));

    }

    TabStorage.prototype = {

        getTabs: function() {
            return webStorage.get("crontabs");
        },

        getTabsOrNewTab: function() {
            return this.getTabs() || this.getEmptyTabList();
        },

        getEmptyTabList: function() {
            return [{
                url: "",
                crons: [{
                    "type": "cron",
                    "operation": "show",
                    "expression": ""
                }]
            }];
        },

        setTabs: function(tabs) {
            webStorage.add("crontabs", tabs);
        },

        broadcast: function() {
            _.each(callbacks, _.bind(function(cb) {
                cb(this.getTabs());
            }, this));
        },

        onChange: function(cb) {
            callbacks.push(cb);
        }
    };

    return new TabStorage();
}]);
