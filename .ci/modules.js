var fs = require('fs'),
    modules = [];

fs.readdirSync('.').forEach(name => {
    var index = './' + name + '/readme.md';
    if (fs.existsSync(index)) modules.push(name);
});


module.exports = modules;
