angular.module("crontabs").factory("TabStorage", function(webStorage, Messaging) {

    var callbacks = [];

    function getTabs() {
        return webStorage.get("crontabs");
    }

    function TabStorage() {
        Messaging.onMessage.addListener(_.bind(function(message) {
            if (message === "saved") {
                this.broadcast(getTabs());
            }
        }, this));

    }

    TabStorage.prototype = {

        getTabs: getTabs,

        getTabsOrNewTab: function() {
            return getTabs() || [{
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

        broadcast: function(crontabs) {
            _.each(callbacks, function(cb) {
                cb(crontabs);
            });
        },

        onChange: function(cb) {
            callbacks.push(cb);
        }
    };

    return new TabStorage();
});
