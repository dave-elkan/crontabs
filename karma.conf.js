module.exports = function(config) {
    config.set({
        basePath: "app",
        frameworks: ["jasmine"],

        files: [
            'bower_components/underscore/underscore-min.js',
            'bower_components/jquery/jquery.min.js',
            'bower_components/angular/angular.js',
            'bower_components/angular-mocks/angular-mocks.js',
            'bower_components/angular-route/angular-route.js',
            'bower_components/checklist-model/checklist-model.js',
            'bower_components/angular-webstorage/angular-webstorage.js',
            'bower_components/later/later.js',
            'scripts/crontabs.js',
            'scripts/services/*.js',
            '../test/**/*.js'
        ]
    });
};