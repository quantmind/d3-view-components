

module.exports = {
    out: 'site/docs.js',
    prepend: [
        'es6-promise/dist/es6-promise.auto.js',
        'whatwg-fetch/fetch.js'
    ],
    append: [
        'build/docs.js'
    ],
    dependencies: {
        handlebars: {
            main: 'dist/handlebars.min.js'
        }
    }
};
