angular.module("crontabs").controller("EnabledCtrl", function($scope, i18nManager, CrontabsEnabledState, Messaging) {

    function getEnabledStateLabel(enabled) {
        var key = enabled ? "crontabsEnabled" : "crontabsDisabled";
        return i18nManager(key);
    }

    $scope.enabledText = getEnabledStateLabel(CrontabsEnabledState.isEnabled());
    $scope.enabled = CrontabsEnabledState.isEnabled();

    Messaging.onMessage.addListener(function(message) {
        if (message && message.enabled != undefined) {
            $scope.$apply(function () {
                $scope.enabledText = getEnabledStateLabel(message.enabled);
                $scope.enabled = message.enabled;
            });
        }
    });

});