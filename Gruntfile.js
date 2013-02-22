module.exports = function(grunt) {
    var testRunner = "TestRunner.html?test=";	
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		qunit: {
			all: {
				options: {
					urls: [
						testRunner + 'Tab'
					]
				}
			}
		},
		hogan: {
			crontabs: {
				templates: "templates/**/*.hogan",
				output: "src/js/templates.js",
				binderName: "amd"
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-qunit');
	grunt.loadNpmTasks('grunt-hogan');
};
