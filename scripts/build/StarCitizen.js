"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const child_process_1 = require("child_process");
const xml2js_1 = require("xml2js");
const dictionary = {};
function getLabelFromDictionary(label) {
    if (label.indexOf("@") === 0) {
        label = label.substring(1);
    }
    return dictionary[label] || label;
}
//path constants
const starCitizenInstallPath = 'C:/Games/Roberts Space Industries/StarCitizen/LIVE/';
const starCitizenDataPath = 'data/star-citizen/';
const globalIniPath = 'Data/Localization/english/global.ini';
const defaultProfilePath = "Data/Libs/Config/defaultProfile.xml";
const actionmapsPath = `${starCitizenInstallPath}USER/Client/0/Profiles/default/actionmaps.xml`;
console.log(actionmapsPath);
//get global.ini and defaultProfile.xml from Data.p4k
console.log("get data from star citizen install - start");
try {
    fs_1.default.rmdirSync(starCitizenDataPath + "Data/", { recursive: true });
}
catch (_a) {
    console.log("no data folder to remove");
}
console.log(process.cwd());
(0, child_process_1.spawnSync)(`unp4k-suite/unp4k.exe`, [`${starCitizenInstallPath}Data.p4k`, `${globalIniPath}`], { cwd: `${process.cwd()}/${starCitizenDataPath}` });
(0, child_process_1.spawnSync)(`unp4k-suite/unp4k.exe`, [`${starCitizenInstallPath}Data.p4k`, `${defaultProfilePath}`], { cwd: `${process.cwd()}/${starCitizenDataPath}` });
(0, child_process_1.spawnSync)(`${starCitizenDataPath}/unp4k-suite/unforge.exe`, [`${starCitizenDataPath}${defaultProfilePath}`]);
console.log("get data from star citizen install - end");
//parse global.ini
console.log("parse global.ini - start");
let data = fs_1.default.readFileSync(`${starCitizenDataPath}${globalIniPath}`);
const lines = data.toString().split('\n');
lines.forEach((line) => {
    const [key, value] = line.split('=');
    if (key && value && key.indexOf("ui_") === 0)
        dictionary[key.trim().replace(/,P$/, "")] = value.trim();
});
console.log("parse global.ini - end");
//load the default profile
console.log("parse defaultProfile.xml - start");
data = fs_1.default.readFileSync(`${starCitizenDataPath}${defaultProfilePath}`);
const keyboardActions = [];
const convertToKeybind = (keybind) => {
    if (!keybind)
        return "";
    return keybind.replace("lctrl", "LEFT_CONTROL")
        .replace("lshift", "LEFT_SHIFT")
        .replace("lalt", "LEFT_ALT")
        .replace("rctrl", "RIGHT_CONTROL")
        .replace("rshift", "RIGHT_SHIFT")
        .replace("ralt", "RIGHT_ALT");
};
// Parse the XML data
(0, xml2js_1.parseString)(data.toString(), (parseErr, result) => {
    if (parseErr) {
        console.error(`Error parsing XML: ${parseErr}`);
        return;
    }
    // Process the parsed XML data here
    const actionMaps = result.profile.actionmap;
    actionMaps.forEach((actionMap) => {
        const label = actionMap.$.UILabel;
        if (label) {
            actionMap.action.forEach((action) => {
                var _a;
                const actionObject = {
                    keybind: convertToKeybind((_a = action.$.keyboard) === null || _a === void 0 ? void 0 : _a.trim()),
                    category: getLabelFromDictionary(label),
                    label: getLabelFromDictionary(action.$.UILabel || action.$.name),
                    action: action.$.name,
                    activationMode: action.$.activationMode,
                };
                keyboardActions.push(actionObject);
            });
        }
    });
});
console.log("parse defaultProfile.xml - end");
//load current keybindings
console.log("parse actionmaps.xml - start");
data = fs_1.default.readFileSync(actionmapsPath);
// Parse the XML data
(0, xml2js_1.parseString)(data.toString(), (parseErr, result) => {
    var _a;
    if (parseErr) {
        console.error(`Error parsing XML: ${parseErr}`);
        return;
    }
    (_a = result.ActionMaps.ActionProfiles[0].actionmap) === null || _a === void 0 ? void 0 : _a.forEach((actionMap) => {
        actionMap.action.forEach((action) => {
            action.rebind.forEach((rebind) => {
                if (rebind.$.input.indexOf("kb1_") === 0) {
                    const keybind = rebind.$.input.replace("kb1_", "");
                    const keyboardAction = keyboardActions.find((keyboardAction) => keyboardAction.action === action.$.name);
                    if (keyboardAction) {
                        keyboardAction.keybind = convertToKeybind(keybind);
                    }
                }
            });
        });
    });
});
console.log("parse actionmaps.xml - end");
//load the star cititzen app to get the actiosn that need keybinds
console.log("find actions without keybinds - start");
const starCitizenAppPath = '../server/applications/star-citizen.json';
data = fs_1.default.readFileSync(starCitizenAppPath);
var app = JSON.parse(data.toString());
var actionsWithoutKeybinds = [];
const checkButton = (button) => {
    if (button && button.Action) {
        const action = keyboardActions.find((keyboardAction) => keyboardAction.action === button.Action);
        if (action) {
            if (action.keybind === "") {
                actionsWithoutKeybinds.push(`${button.TextLabel} - ${action.category} - ${action.label}`);
            }
        }
        else {
            actionsWithoutKeybinds.push(`unknown button action: ${button.TextLabel} - ${button.Action}`);
        }
    }
};
app.pannels.forEach((pannel) => {
    pannel.Top.forEach((button) => checkButton(button));
    pannel.Left.forEach((button) => checkButton(button));
    pannel.Right.forEach((button) => checkButton(button));
    pannel.Bottom.forEach((button) => checkButton(button));
    pannel.Rocker.forEach((rocker) => { checkButton(rocker.Top); checkButton(rocker.Bottom); });
});
console.log("find actions without keybinds - end");
// Write keyboard actions to JSON file
console.log("write keyboard actions to file - start");
const filePath = '../server/applications/star-citizen-keybinds.json';
fs_1.default.writeFileSync(filePath, JSON.stringify(keyboardActions));
fs_1.default.writeFileSync('../server/applications/star-citizen-missing-keybinds.txt', actionsWithoutKeybinds.join("\n"));
console.log("write keyboard actions to file - end");
