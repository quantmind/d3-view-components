
module.exports = {

    basePath: '../',
    singleRun: false,
    frameworks: ['jasmine', 'browserify'],
    reporters: ['progress'],

    files: [
        './node_modules/babel-polyfill/dist/polyfill.js',
        './node_modules/whatwg-fetch/fetch.js',
        './src/**/test.js'
    ],

    preprocessors: {
        'src/**/*.js': ['browserify'],
    },

    browserify: {
        debug: true,
        transform: ['babelify']
    },

    customLaunchers: {
        ChromeNoSandbox: {
            base: 'Chrome',
            flags: ['--no-sandbox']
        }
    }
};
