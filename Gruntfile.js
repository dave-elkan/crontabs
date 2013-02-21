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
		}
	});

	grunt.loadNpmTasks('grunt-contrib-qunit');
};
