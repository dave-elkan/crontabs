module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

        watch: {
            karma: {
                files: ['src/js/**/*.js', 'src/test/**/*.js'],
                tasks: ['karma:unit:run']
            }
        },

        karma: {
            unit: {
                configFile: "karma.conf.js",
                background: true
            },

            continuous: {
                configFile: 'karma.conf.js',
                singleRun: true,
                browsers: ['PhantomJS']
            }
        }
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-karma');

    grunt.registerTask('test', [
        'default'
    ]);
    
    grunt.registerTask('default', [
        'karma'
    ]);
};
