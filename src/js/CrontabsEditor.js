define(["brace", "TabCollection", "TabCollectionView", "TabStorage"], function(Brace, TabCollection, TabCollectionView, TabStorage) {
	return function() {
		var rawTabs = TabStorage.get();
		var tabs = (rawTabs) ? rawTabs : [{
			url: "",
			crons: [{}]
		}];
		var tabCollection = new TabCollection();
		var tabCollectionView = new TabCollectionView({
			model: tabCollection,
			el: $(".aui-page-panel .aui-page-panel-content")
		});
		
		tabCollectionView.render();
		tabCollection.reset(tabs);
	};
});
