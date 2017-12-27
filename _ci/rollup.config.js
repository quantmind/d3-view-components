import json from 'rollup-plugin-json';
import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';


export default {
    input: '_ci/docs.js',
    output: {
        file: 'build/.tmp/docs.js',
        format: 'iife'
    },
    plugins: [
        json(),
        resolve(),
        babel({
            babelrc: false,
            plugins: ['external-helpers'],
            presets: ['es2015-rollup']
        })
    ]
};
