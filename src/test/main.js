CrontabsConfig.map = {
	"*": {
		"MessageManager": "stubMessageManager",
        "ChromeTabs": "stubChromeTabs"
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
