const json = require('rollup-plugin-json');
const babel = require('rollup-plugin-babel');
const string = require('rollup-plugin-string');
const sourcemaps = require('rollup-plugin-sourcemaps');


const
    pkg = require('../package.json'),
    d3External = Object.keys(pkg.dependencies).concat(Object.keys(pkg.peerDependencies)).filter(name => name.substring(0, 3) === 'd3-'),
    external = d3External.concat(['handlebars']),
    globals = d3External.reduce((g, name) => {g[name] = 'd3'; return g;}, {handlebars: 'handlebars'});


module.exports = {
    input: 'index.js',
    external: external,
    output: {
        file: 'build/d3-view-components.js',
        format: 'umd',
        extend: true,
        sourcemap: true,
        name: 'd3',
        globals: globals
    },
    plugins: [
        json(),
        string({
            include: 'src/**/*.html'
        }),
        sourcemaps()
    ]
};
