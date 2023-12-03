const { exec } = require('child_process');
const fs = require('node:fs');

exports.send = async function(window, toSend) {
    toSend = toSend.replaceAll(" ", "{SPACE}")

    //var cmd = `WinSendKeys.exe -w \"${window}\" ${toSend}`;
    //cmd = `echo -ne "\0\0\x1a\x0b\x04\x17\x18\x13" > /dev/hidg0 && echo -ne "\0\0\0\0\0\0\0\0" > /dev/hidg0`;

    //await exec(cmd);

    fs.writeFileSync("/dev/hidg0", "\0\0\x1a\x0b\x04\x17\x18\x13\n0\0\0\0\0\0\0\0", err => {
        if(err) {
            console.log(err);
        }
    });
}