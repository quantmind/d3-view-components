//
//  Export the sorted list of modules with readme file
var fs = require('fs'),
    components = [],
    pages = {};

fs.readdirSync('.').forEach(name => {
    var n = name.length-3,
        target;

    if (name.substring(n) === '.md') {
        target = name;
        name = name === 'readme.md' ? 'index' : name.substring(0, n);
        pages[target] = name;
    } else if (name !== 'build') {
        target = './' + name + '/readme.md';
        if (fs.existsSync(target)) {
            components.push(name);
            pages[name] = name;
        }
    }
});


module.exports = {
    components: components,
    pages: pages
};
