

exports.load = function(name) {
    //var data = require(`./applications/${name}.json`);
    var data = require(`./client/src/applications/${name}.json`);

    exports.window = data.window;

    exports.commands = data.commands;
}