#!/usr/bin/env node
//
//  Build d3-view-components documentation site
//
//  yarn docs
//
const fs = require('fs-extra');
const logger = require('console');
const Handlebars = require('handlebars');
const pkg = require('../package.json');
const modules = require('./modules.js');

const srcPath = '.ci';
const sitePath = 'build';

const templateFile = `${srcPath}/index.html.tpl`;
const min = process.env.CI ? '.min' : '';
const version = pkg.version.split('.').join('_');
const componentsInfo = JSON.stringify(modules.components);

function capFirst(text) {
    return text.substring(0, 1).toUpperCase() + text.substring(1);
}

// symlink to d3-view (for development)
fs.ensureSymlink('../node_modules/d3-view/build/d3-view.js', `${sitePath}/d3-view.js`);


// read template
fs.readFile(templateFile, 'utf8', (err, source) => {
    if (err) {
        return logger.error(`Failed to read template: $ {
            templateFile
        }`);
    }
    const template = Handlebars.compile(source);

    // read pages
    Object.keys(modules.pages).forEach(path => {
        let name = modules.pages[path],
            title = '';

        if (name !== 'index') title = ' - ' + capFirst(name);

        // copy raw file/directory
        fs.copySync(path, `${sitePath}/${path}`);

        // create the html page
        var outFile = `${sitePath}/${name}.html`,
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
