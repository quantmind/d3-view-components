import json from 'rollup-plugin-json';
import babel from 'rollup-plugin-babel';
import sourcemaps from 'rollup-plugin-sourcemaps';


const
    pkg = require('./package.json'),
    d3External = Object.keys(pkg.dependencies).filter(name => name.substring(0, 3) === 'd3-'),
    external = d3External.concat(['handlebars']),
    globals = d3External.reduce((g, name) => {g[name] = 'd3'; return g;}, {handlebars: 'handlebars'});


export default {
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
        babel({
            babelrc: false,
            plugins: ['external-helpers'],
            presets: ['es2015-rollup']
        }),
        sourcemaps()
    ]
};
