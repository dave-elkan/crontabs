CrontabsConfig.map = {
	"*": {
		"MessageManager": "stubMessageManager"
	}
};

requirejs.config(CrontabsConfig);

define("stubMessageManager", function () {
	return function(message) {
		return message;
	};
});
