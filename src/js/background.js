(function() {
    later.date.localTime();

    angular.module("crontabs.background", ['crontabs.service', 'webStorageModule']).
        run(function(ChromeTabs, Messaging, ChromeTabManager, CrontabsEnabledState, webStorage) {
            var tabs = webStorage.get("crontabs") || [{}];
            var runner = new CrontabRunner(ChromeTabs, ChromeTabManager, CrontabsEnabledState, tabs);
            Messaging.onMessage.addListener(runner.onCronsUpdated);
        });

})();