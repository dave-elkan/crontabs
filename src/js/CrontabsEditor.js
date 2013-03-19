define(["brace", "TabCollection", "TabCollectionView", "TabStorage"], function(Brace, TabCollection, TabCollectionView, TabStorage) {
	return function() {
		var tabs = TabStorage.get();
		var tabCollection = new TabCollection();
		var tabCollectionView = new TabCollectionView({
			model: tabCollection,
			el: $(".aui-page-panel .aui-page-panel-content")
		});
		
		tabCollectionView.render();
		tabCollection.reset(tabs);
	};
});
