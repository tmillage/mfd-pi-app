import fs from 'fs';
import { spawnSync } from 'child_process';
import { parseString } from 'xml2js';

const dictionary: { [key: string]: string } = {};


function getLabelFromDictionary(label: string) {
	if (label.indexOf("@") === 0) {
		label = label.substring(1);
	}
	return dictionary[label] || label;
}

//path constants
const starCitizenInstallPath = 'C:/Games/Roberts Space Industries/StarCitizen/LIVE/';
const starCitizenDataPath = 'data/star-citizen/';

const globalIniPath = 'Data/Localization/english/global.ini'
const defaultProfilePath = "Data/Libs/Config/defaultProfile.xml";
const actionmapsPath = `${starCitizenInstallPath}USER/Client/0/Profiles/default/actionmaps.xml`;
console.log(actionmapsPath);

//get global.ini and defaultProfile.xml from Data.p4k
console.log("get data from star citizen install - start");
try {
	fs.rmdirSync(starCitizenDataPath + "Data/", { recursive: true });
} catch {
	console.log("no data folder to remove");
}
console.log(process.cwd());

spawnSync(`unp4k-suite/unp4k.exe`, [`${starCitizenInstallPath}Data.p4k`, `${globalIniPath}`], { cwd: `${process.cwd()}/${starCitizenDataPath}` });
spawnSync(`unp4k-suite/unp4k.exe`, [`${starCitizenInstallPath}Data.p4k`, `${defaultProfilePath}`], { cwd: `${process.cwd()}/${starCitizenDataPath}` });
spawnSync(`${starCitizenDataPath}/unp4k-suite/unforge.exe`, [`${starCitizenDataPath}${defaultProfilePath}`]);

console.log("get data from star citizen install - end");

//parse global.ini
console.log("parse global.ini - start");
let data = fs.readFileSync(`${starCitizenDataPath}${globalIniPath}`);
const lines = data.toString().split('\n');

lines.forEach((line) => {
	const [key, value] = line.split('=');
	if (key && value && key.indexOf("ui_") === 0)
		dictionary[key.trim().replace(/,P$/, "")] = value.trim();
});
console.log("parse global.ini - end");

//load the default profile
console.log("parse defaultProfile.xml - start");
data = fs.readFileSync(`${starCitizenDataPath}${defaultProfilePath}`);

const keyboardActions: any[] = [];

const convertToKeybind = (keybind: string) => {
	if (!keybind) return "";

	return keybind.replace("lctrl", "LEFT_CONTROL")
		.replace("lshift", "LEFT_SHIFT")
		.replace("lalt", "LEFT_ALT")
		.replace("rctrl", "RIGHT_CONTROL")
		.replace("rshift", "RIGHT_SHIFT")
		.replace("ralt", "RIGHT_ALT")
		.replace("np_1", "NUMPAD_ONE")
		.replace("np_2", "NUMPAD_TWO")
		.replace("np_3", "NUMPAD_THREE")
		.replace("np_4", "NUMPAD_FOUR")
		.replace("np_5", "NUMPAD_FIVE")
		.replace("np_6", "NUMPAD_SIX")
		.replace("np_7", "NUMPAD_SEVEN")
		.replace("np_8", "NUMPAD_EIGHT")
		.replace("np_9", "NUMPAD_NINE")
		.replace("np_0", "NUMPAD_ZERO")
		.replace("np_add", "NUMPAD_PLUS")
		.replace("np_subtract", "NUMPAD_MINUS")
		.replace("np_multiply", "NUMPAD_ASTERISK")
		.replace("np_divide", "NUMPAD_FORWARD_SLASH")
		.replace("np_period", "NUMPAD_PERIOD")
		.replace("np_enter", "NUMPAD_ENTER");
}

// Parse the XML data
parseString(data.toString(), (parseErr: Error | null, result: any) => {
	if (parseErr) {
		console.error(`Error parsing XML: ${parseErr}`);
		return;
	}

	// Process the parsed XML data here
	const actionMaps = result.profile.actionmap;

	actionMaps.forEach((actionMap: any) => {
		const label = actionMap.$.UILabel;
		if (label) {
			actionMap.action.forEach((action: any) => {
				const actionObject = {
					keybind: convertToKeybind(action.$.keyboard?.trim()),
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

data = fs.readFileSync(actionmapsPath);

// Parse the XML data
parseString(data.toString(), (parseErr: Error | null, result: any) => {
	if (parseErr) {
		console.error(`Error parsing XML: ${parseErr}`);
		return;
	}

	result.ActionMaps.ActionProfiles[0].actionmap?.forEach((actionMap: any) => {
		actionMap.action.forEach((action: any) => {
			action.rebind.forEach((rebind: any) => {
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

data = fs.readFileSync(starCitizenAppPath);

var app = JSON.parse(data.toString());
var actionsWithoutKeybinds: string[] = [];

const checkButton = (button: any) => {
	if (button && button.Action) {
		const action = keyboardActions.find((keyboardAction) => keyboardAction.action === button.Action);
		if (action) {
			if (action.keybind === "") {
				actionsWithoutKeybinds.push(`${button.TextLabel} - ${action.category} - ${action.label}`);
			}
		} else {
			actionsWithoutKeybinds.push(`unknown button action: ${button.TextLabel} - ${button.Action}`);
		}
	}

}

app.pannels.forEach((pannel: any) => {
	pannel.Top.forEach((button: any) => checkButton(button));
	pannel.Left.forEach((button: any) => checkButton(button));
	pannel.Right.forEach((button: any) => checkButton(button));
	pannel.Bottom.forEach((button: any) => checkButton(button));
	pannel.Rocker.forEach((rocker: any) => { checkButton(rocker.Top); checkButton(rocker.Bottom); });
});
console.log("find actions without keybinds - end");


// Write keyboard actions to JSON file
console.log("write keyboard actions to file - start");
const filePath = '../server/applications/star-citizen-keybinds.json';
fs.writeFileSync(filePath, JSON.stringify(keyboardActions));
fs.writeFileSync('../server/applications/star-citizen-missing-keybinds.txt', actionsWithoutKeybinds.join("\n"));
console.log("write keyboard actions to file - end");