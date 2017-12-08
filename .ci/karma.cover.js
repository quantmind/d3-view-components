var assign = require('object-assign');
var base = require('./karma.base.js');


module.exports = function (config) {
    var transforms = base.browserify.transform;

    transforms.push(
        [
            'browserify-istanbul',
            {
                instrumenterConfig: {
                    embedSource: true
                }
            }
        ]
    );

    var options = assign(base, {

        browsers: ['Chrome'],

        reporters: ['progress', 'coverage'],

        preprocessors: {
            './*/test.js': ['browserify', 'coverage']
        },

        coverageReporter: {
            dir: 'build/coverage/',
            reporters: [
                {type: 'lcov', subdir: '.'},
                {type: 'text-summary', subdir: '.'},
                {type : 'html'}
            ]
        },

        browserify: {
            debug: true,
            transform: transforms
        }
    });

    if(process.env.TRAVIS || process.env.CIRCLECI) {
        options.browsers = ['ChromeNoSandbox'];
    }

    config.set(options);
};
