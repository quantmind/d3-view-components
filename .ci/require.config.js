

module.exports = {
    out: 'build/docs.js',
    prepend: [
        'es6-promise/dist/es6-promise.auto.js',
        'whatwg-fetch/fetch.js'
    ],
    append: [
        'build/.tmp/docs.js'
    ],
    dependencies: {
        'd3-view-components': {
            origin: '/',
            main: 'd3-view-components.js'
        },
        handlebars: {
            main: 'dist/handlebars.min.js'
        }
    }
};
