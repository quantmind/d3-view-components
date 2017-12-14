const components = require('./modules.js').components;


const
    tests = components.map(function (m) {return './' + m + '/test.js';}),
    html = components.map(function (m) {return './' + m + '/*.html';});


module.exports = {

    basePath: '../',
    singleRun: false,
    frameworks: ['jasmine', 'browserify'],
    reporters: ['progress'],

    files: [
        './node_modules/babel-polyfill/dist/polyfill.js',
        './node_modules/whatwg-fetch/fetch.js',
    ].concat(tests).concat(html),

    preprocessors: components.reduce(function (p, name) {
        p['./' + name + '/test.js'] = ['browserify'];
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
