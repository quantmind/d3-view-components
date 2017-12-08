#!/usr/bin/env node
//
//  Build d3-view-components documentation site
//
//  yarn docs
//
const fs = require('fs');
const logger = require('console');
const Handlebars = require('handlebars');
const pkg = require('../package.json');
const components = require('./modules.js')

const srcPath = '.ci';
const sitePath = 'site';

const templateFile = `${srcPath}/index.html.tpl`;
const pagesPath = `.`;
const min = process.env.CI ? '.min' : '';
const version = pkg.version.split('.').join('_');
const componentsInfo = JSON.stringify(components);

function capFirst(text) {
    return text.substring(0, 1).toUpperCase() + text.substring(1);
}

// read template
fs.readFile(templateFile, 'utf8', (err, source) => {
    if (err) {
        return logger.error(`Failed to read template: $ {
            templateFile
        }`);
    }
    const template = Handlebars.compile(source);

    // read pages
    [''].concat(components).forEach(name => {
        let page = 'index',
            title = '';

        if (name) {
            title = ' - ' + capFirst(name);
            page = name;
        }

        var outFile = `${sitePath}/${page}.html`,
            contents = template({
                version: version,
                min: min,
                title: pkg.title + title,
                components: componentsInfo
            });

        fs.writeFile(outFile, contents, err => {
            if (err) {
                logger.error(`Failed to write ${outFile}: ${err}`);
            } else {
                logger.info(`Created ${outFile}`);
            }
        });
    });

});
