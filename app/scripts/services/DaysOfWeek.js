angular.module("crontabs").factory("DaysOfWeek", ['i18nManager', function(i18nManager) {
    return [{
        id: "MON",
        num: 2,
        name: i18nManager("dayMonday")
    }, {
        id: "TUE",
        num: 3,
        name: i18nManager("dayTuesday")
    }, {
        id: "WED",
        num: 4,
        name: i18nManager("dayWednesday")
    }, {
        id: "THU",
        num: 5,
        name: i18nManager("dayThursday")
    }, {
        id: "FRI",
        num: 6,
        name: i18nManager("dayFriday")
    }, {
        id: "SAT",
        num: 7,
        name: i18nManager("daySaturday")
    }, {
        id: "SUN",
        num: 1,
        name: i18nManager("daySunday")
    }];
}]);
