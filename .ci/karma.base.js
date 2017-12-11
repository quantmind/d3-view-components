const modules = require('./modules.js');


const files = modules.map(function (m) {return './' + m + '/test.js';});


module.exports = {

    basePath: '../',
    singleRun: false,
    frameworks: ['jasmine', 'browserify'],
    reporters: ['progress'],

    files: [
        './node_modules/babel-polyfill/dist/polyfill.js',
        './node_modules/whatwg-fetch/fetch.js',
    ].concat(files),

    preprocessors: files.reduce(function (p, file) {
        p[file] = ['browserify'];
        return p;
    }, {}),

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
