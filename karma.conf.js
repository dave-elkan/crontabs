module.exports = function(config) {
    config.set({
        basePath: "src",
        frameworks: ["jasmine"],

        files: [
            'lib/bower_components/underscore/underscore-min.js',
            'lib/bower_components/jquery/jquery.min.js',
            'lib/bower_components/angular/angular.min.js',
            'lib/bower_components/angular-mocks/angular-mocks.js',
            'lib/bower_components/angular-route/angular-route.js',
            'lib/bower_components/checklist-model/checklist-model.js',
            'lib/bower_components/angular-webstorage/angular-webstorage.js',
            'test/lib/sinon-1.6.0.js',
            'js/crontabs.js',
            'js/services/*.js',
            'test/*.js'
        ]
    });
};