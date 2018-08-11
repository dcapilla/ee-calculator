module.exports = function(config){
  config.set({

    basePath : './',

    reporters: ['dots', 'coverage'],

    coverageReporter: {
      type : 'html',
      dir : 'coverage/'
    },

    preprocessors: {
      'app/components/**/*component.js': ['coverage'],
      'app/components/**/*service.js': ['coverage']
    },

    files : [
      'node_modules/angular/angular.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'app/app.js',
      'app/components/**/*.js'
    ],

    autoWatch : true,
    frameworks: ['jasmine'],
    browsers : ['PhantomJS'],

    plugins : [
      'karma-jasmine',
      'karma-coverage',
      'karma-phantomjs-launcher'
    ]
  });
};
