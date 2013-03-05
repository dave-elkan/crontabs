require(["underscore", "backbone"], function(_, Backbone) {
//	console.log(
});
//var crontabs = localStorage["crontabs"];
var crontabs = [{
	url: "http://www.edave.net/",
	actions: [{
		when: "*/2 * * * *",
		action: "open",
		reload: false
	}, {
		when: "1-59/2 * * * *",
		action: "close"
	}]
}];
/*
chrome.browserAction.setBadgeBackgroundColor({
	"color": "#FF0000"
});

_.each(crontabs, function(crontab, i) {
	getOrCreateTab(crontab, i, function(tab) {
		crontab.id = tab.id;
		_.each(crontab.actions, function(action) {
			var schedule = cronParser().parse(action.when);
			later().exec(schedule, new Date(), function() {
				console.log("Updating tab with url", crontab.where);
				chrome.tabs.update(crontab.id, {
					active: true
				});
				if (crontab.reload) {
					chrome.tabs.reload(crontab.id);
				}
			});
		});
	});
});

function getOrCreateTab(crontab, i, callback) {
	chrome.tabs.query({
		url: crontab.url
	}, function(tabs) {
		if (tabs.length) {
			if (i === 0) {
				chrome.tabs.update(tabs[0].id, {
					active: true
				});
			}
			callback(tabs[0]);
		} else {
			console.log("Creating tab at ", i, " with ", crontab.where);
			chrome.tabs.create({
				url: crontab.where,
				active: i === 0
			}, callback);
		}
	});
}*/
