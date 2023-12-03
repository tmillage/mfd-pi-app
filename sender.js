const { exec } = require('child_process');

exports.send = async function(window, toSend) {
    toSend = toSend.replaceAll(" ", "{SPACE}")

    var cmd = `WinSendKeys.exe -w \"${window}\" ${toSend}`;

    //await exec(cmd);
}