angular.module("crontabs").value("NotFirstOrLastRemovableService", {

    isRemovable: function(isFirst, items) {
        return !isFirst || items.length > 1;
    }

});