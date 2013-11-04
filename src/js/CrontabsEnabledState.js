services.factory("CrontabsEnabledState", function(webStorage) {
    var key = "crontabsEnabled";
    var enabled = _getEnablement();
    var callback = function() {};

    if (!enabled && enabled !== false) {
        _setEnablement(false);
    }

    function _getEnablement() {
        return webStorage.get(key);
    }

    function _setEnablement(enabled) {
        webStorage.add(key, enabled);
        cb();
    }

    return {

        isEnabled: _getEnablement,

        toggleEnablement: function() {
            _setEnablement(!_getEnablement());
        },

        onChange: function(cb) {
            callback = cb;
        }
    };
});
