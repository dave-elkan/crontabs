define(["brace", "ChromeTabManager", "Tab"], function(Brace, Tab, ChromeTabManager) {

    return Brace.Collection.extend({

        model: Tab,

        initialize: function() {

        }
    });
});
