define(["brace", "ChromeTabManager", "ChromeTab"], function(Brace, ChromeTabManager, ChromeTab) {
    return Brace.Collection.extend({

        model: ChromeTab 
   
        getByCronTab: function(crontab) {
            return this.find(function(model) {
                model.cid === crontab.cid
            });
        }
    });
});
