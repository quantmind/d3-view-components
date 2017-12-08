import json from 'rollup-plugin-json';
import babel from 'rollup-plugin-babel';


export default {
    input: '.ci/docs.js',
    output: {
        file: 'build/docs.js',
        format: 'cjs'
    },
    plugins: [
        json(),
        babel({
            babelrc: false,
            plugins: ['external-helpers'],
            presets: ['es2015-rollup'],
            externalHelpers: true
        })
    ]
};
