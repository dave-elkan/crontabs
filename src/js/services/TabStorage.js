angular.module("crontabs").factory("TabStorage", function(webStorage, Messaging) {

    var callbacks = [];

    function getTabs() {
        return webStorage.get("crontabs");
    }

    function TabStorage() {
        Messaging.onMessage.addListener(_.bind(function() {
            this.broadcast(getTabs());
        }, this));

    }

    TabStorage.prototype = {

        getTabs: getTabs,

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