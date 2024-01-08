"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const xml2js_1 = require("xml2js");
const dictionary = {};
function getLabelFromDictionary(label) {
    if (label.indexOf("@") === 0) {
        label = label.substring(1);
    }
    return dictionary[label] || label;
}
const defaultGlobalIniPath = 'data/star-citizen/global.ini';
let data = fs_1.default.readFileSync(defaultGlobalIniPath);
// Parse the INI data
const lines = data.toString().split('\n');
lines.forEach((line) => {
    const [key, value] = line.split('=');
    if (key && value && key.indexOf("ui_") === 0)
        dictionary[key.trim()] = value.trim();
});
const keyboardActions = [];
//load the default profile
const defaultProfilePath = 'data/star-citizen/defaultProfile.xml';
data = fs_1.default.readFileSync(defaultProfilePath);
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
                    keybind: (_a = action.$.keyboard) === null || _a === void 0 ? void 0 : _a.trim(),
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
//load current keybindings
const actionmapsPath = 'data/star-citizen/actionmaps.xml';
data = fs_1.default.readFileSync(actionmapsPath);
// Parse the XML data
(0, xml2js_1.parseString)(data.toString(), (parseErr, result) => {
    if (parseErr) {
        console.error(`Error parsing XML: ${parseErr}`);
        return;
    }
    result.ActionMaps.ActionProfiles[0].actionmap.forEach((actionMap) => {
        actionMap.action.forEach((action) => {
            action.rebind.forEach((rebind) => {
                if (rebind.$.input.indexOf("kb1_") === 0) {
                    const keybind = rebind.$.input.replace("kb1_", "");
                    const keyboardAction = keyboardActions.find((keyboardAction) => keyboardAction.action === action.$.name);
                    if (keyboardAction) {
                        keyboardAction.keybind = keybind;
                    }
                }
            });
        });
    });
});
//load the star cititzen app to get the actiosn that need keybinds
const starCitizenAppPath = '../server/applications/star-citizen.json';
data = fs_1.default.readFileSync(starCitizenAppPath);
var app = JSON.parse(data.toString());
var actionsWithoutKeybinds = [];
const checkButton = (button) => {
    if (button && button.Action) {
        const action = keyboardActions.find((keyboardAction) => keyboardAction.action === button.Action);
        if (action.keybind === "") {
            actionsWithoutKeybinds.push(`${button.TextLabel} - ${action.category} - ${action.label}`);
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
// Write keyboard actions to JSON file
const filePath = '../server/applications/star-citizen-keybinds.json';
fs_1.default.writeFileSync(filePath, JSON.stringify(keyboardActions));
fs_1.default.writeFileSync('../server/applications/star-citizen-missing-keybinds.txt', actionsWithoutKeybinds.join("\n"));
