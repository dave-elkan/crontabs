CrontabsConfig.map = {
	"*": {
		"MessageManager": "stubMessageManager",
        "ChromeTabs": "stubChromeTabs",
        "ChromeBrowserAction": "stubChromeBrowserAction"
	}
};

requirejs.config(CrontabsConfig);

define("stubMessageManager", function () {
	return function(message) {
		return message;
	};
});

define("stubChromeTabs", function() {
    return {
        "create": function(){},
        "get": function(){},
        "remove": function(){},
        "reload": function(){},
        "update": function(){},
        "query": function(){}
    };
});

define("stubChromeBrowserAction", function() {
    return {
        onEnableButtonClicked: function() {},
        setBrowserActionText: function() {}
    }
});
