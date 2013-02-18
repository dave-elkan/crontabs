$(function() {

    /*var cronTemplate = Hogan.compile($("script#cron").text()),
        formTemplate = Hogan.compile($("script#form").text())*/
    var crontabs = {
			when: "*/5 * * * *",
			where: "http://www.edave.net",
			refresh: false
		};
    
/*	$("body").append(formTemplate.render({crons: crons}, {
        cron: cronTemplate
    }));*/

    $("form").submit(setIfValid);

    function setIfValid(e) {
        e.preventDefault();
        var values = getValues($(this)),
            results = validate(values);

        if (results) {
            localStorage["crontabs"] = JSON.stringify(crontabs);
            alert("Preferences Saved");
        }
    }

    function validate(values) {
        var results = [];
        _.each(values, function(value) {
            if (value.url !== "" && (!value.cron || value.cron === "")) {
                alert("Empty cron expression for URL '" + value.url + "'");
                return false;
            } else {
                var cron = cronParser().parse(value.cron);
                var schedule = later(10, true).get(cron, 5);
                if (!schedule.length) {
                    alert("Invalid cron expression: '" + value.cron + "'");
                    return false;
                }

                value.schedule = schedule;
                results.push(value);
            }
        });

        return results;
    }

    function getValues($form) {
        var values = $form.serializeArray(),
            crons = [];

        _.each(values, function(entry) {
            if (entry.name === "url") {
                crons.push({
                    url: entry.value
                });
            } else {
                _.last(crons)[entry.name] = entry.value;
            }
        });

        return crons;

    }
});
