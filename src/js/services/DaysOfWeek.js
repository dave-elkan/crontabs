angular.module("crontabs").factory("DaysOfWeek", function(i18nManager) {
    return [{
        id: "MON",
        name: i18nManager("dayMonday")
    }, {
        id: "TUE",
        name: i18nManager("dayTuesday")
    }, {
        id: "WED",
        name: i18nManager("dayWednesday")
    }, {
        id: "THUR",
        name: i18nManager("dayThursday")
    }, {
        id: "FRI",
        name: i18nManager("dayFriday")
    }, {
        id: "SAT",
        name: i18nManager("daySaturday")
    }, {
        id: "SUN",
        name: i18nManager("daySunday")
    }];
});
