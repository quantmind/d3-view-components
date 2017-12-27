#!/usr/bin/env node
//
//  Build d3-view-components documentation site
//
//  yarn docs
//
const
    fs = require('fs-extra'),
    path = require('path'),
    rimraf = require('rimraf'),
    logger = require('console'),
    Handlebars = require('handlebars'),
    pkg = require('../package.json'),
    modules = require('./modules.js');

const srcPath = '_ci';
const sitePath = 'build';

const templateFile = `${srcPath}/index.html.tpl`;
const min = process.env.CI ? '.min' : '';
const version = pkg.version.split('.').join('_');
const componentsInfo = JSON.stringify(modules.components);

function capFirst(text) {
    return text.substring(0, 1).toUpperCase() + text.substring(1);
}

// symlink to d3-view (for development)
if (!min)
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
    Object.keys(modules.pages).forEach(src => {
        let obj = modules.pages[src],
            name = obj.name,
            html = obj.html || name,
            raw = `${sitePath}/${src}`,
            outFile = `${sitePath}/${html}.html`,
            title = html === 'index' ? '' : ' - ' + capFirst(name),
            contents = template({
                version: version,
                min: min,
                title: pkg.title + title,
                components: componentsInfo
            });

        // copy raw file/directory
        if (process.env.CI) {
            fs.copySync(src, raw);
            writeHtml(outFile, contents);
        }
        else
            createSymLinks(src, raw, outFile, contents);
    });
});


function writeHtml(outFile, contents) {
    fs.writeFile(outFile, contents, err => {
        if (err) {
            logger.error(`Failed to write ${outFile}: ${err}`);
        } else {
            logger.info(`Created ${outFile}`);
        }
    });
}

function createSymLinks (src, raw, outFile, contents) {
    if (fs.lstatSync(src).isDirectory()) {
        rimraf(raw, fs, function () {
            fs.mkdirSync(raw);
            writeHtml(outFile, contents);
            fs.readdirSync(src).forEach(name => {
                fs.ensureSymlink(path.join(src, name), path.join(raw, name));
            });
        });
    } else {
        fs.ensureSymlink(src, raw);
        writeHtml(outFile, contents);
    }
}
