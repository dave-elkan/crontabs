define(["underscore", "brace", "CronCollection"], function(_, Brace, CronCollection) {
	return Brace.Model.extend({

		namedAttributes: [
			"url",
			"crons"
		],

		initialize: function(model) {
			this.setCrons(new CronCollection(model.crons));
			if (!this.getCrons().length) {
				this.getCrons().add({});
			}
		},

		validate: function(attrs, options) {
			if (!attrs.url) {
				return chrome.i18n.getMessage("tabUrlInvalid");
			}

			if (!attrs.crons.length) {
				return chrome.i18n.getMessage("tabCronsInvalid");
			}
		},

		toJSON: function() {
			return {
				url: this.getUrl(),
				crons: this.getCrons().toJSON()
			}
		},

		toChromeTab: function() {
			return {
				url: this.getUrl()
			}
		}
	});
});
