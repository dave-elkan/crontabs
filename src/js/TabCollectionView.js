define(["underscore", "jquery", "brace", "templates", "TabView"], function(_, $, Brace, templates, TabView) {
	return Brace.View.extend({

		template: templates.TabCollectionView,

		events: {
			"click button.add": "addTab",
			"click button.save": "validateAndSave",
            "click button.remove": "removeTab"
		},

		initialize: function() {
			this.model.on("add", this.tabAdded, this);
			this.model.on("reset", this.tabsAdded, this);
			this.model.on("remove", this.tabRemoved, this);
		},

		render: function() {
			this.$el.html(this.template());
			_.defer(_.bind(function() {
				this.$el.find("input.url:first").focus();
			}, this));
		},

		// TODO addTab button should only show once first tab is valid
		addTab: function(e) {
			e.preventDefault();
			this.model.add({});
			this.focusLastTabUrl();
		},

        removeTab: function(e) {
            e.preventDefault();
            var target = $(e.target);
            this.model.remove(this.model.get(target.data("cid")));
            this.$el.find("input.url:last").focus();
        },

		appendToTabContainer: function(tab) {
			this.$el.find(".tabs").append(tab);
		},

		tabAdded: function(model) {
			this.appendToTabContainer(this.renderTab(model, true));
		},

		tabsAdded: function() {
			var html = this.model.map(function(tab, i) {
                return this.renderTab(tab, i !== 0);
			}, this);

			this.appendToTabContainer(html);
			this.focusFirstTabUrl();
		},

        renderTab: function(tab, removable) {
            return new TabView({
                model: tab
            }, {
                removable: removable
            }).render()
        },

		tabRemoved: function(model) {
			this.$el.find("[data-tab-cid='"+ model.cid + "']").remove();
		},

		focusFirstTabUrl: function() {
			this.$el.find("input.url:first").focus();
		},

		focusLastTabUrl: function() {
			this.$el.find("input.url:last").focus();
		},

		validateAndSave: function(e) {
			e.preventDefault();
			this.model.save(true);
		}
	});
});
