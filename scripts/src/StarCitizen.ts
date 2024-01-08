import fs from 'fs';
import { json } from 'stream/consumers';
import { parseString } from 'xml2js';

const dictionary: { [key: string]: string } = {};


function getLabelFromDictionary(label: string) {
	if (label.indexOf("@") === 0) {
		label = label.substring(1);
	}
	return dictionary[label] || label;
}

const defaultGlobalIniPath = 'data/star-citizen/global.ini';

let data = fs.readFileSync(defaultGlobalIniPath);

// Parse the INI data
const lines = data.toString().split('\n');

lines.forEach((line) => {
	const [key, value] = line.split('=');
	if (key && value && key.indexOf("ui_") === 0)
		dictionary[key.trim()] = value.trim();
});

const keyboardActions: any[] = [];

//load the default profile
const defaultProfilePath = 'data/star-citizen/defaultProfile.xml';

data = fs.readFileSync(defaultProfilePath);

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
					keybind: action.$.keyboard?.trim(),
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

data = fs.readFileSync(actionmapsPath);

// Parse the XML data
parseString(data.toString(), (parseErr: Error | null, result: any) => {
	if (parseErr) {
		console.error(`Error parsing XML: ${parseErr}`);
		return;
	}

	result.ActionMaps.ActionProfiles[0].actionmap.forEach((actionMap: any) => {
		actionMap.action.forEach((action: any) => {
			action.rebind.forEach((rebind: any) => {
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

data = fs.readFileSync(starCitizenAppPath);

var app = JSON.parse(data.toString());
var actionsWithoutKeybinds: string[] = [];

const checkButton = (button: any) => {
	if (button && button.Action) {
		const action = keyboardActions.find((keyboardAction) => keyboardAction.action === button.Action);
		if (action.keybind === "") {
			actionsWithoutKeybinds.push(`${button.TextLabel} - ${action.category} - ${action.label}`);
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


// Write keyboard actions to JSON file
const filePath = '../server/applications/star-citizen-keybinds.json';
fs.writeFileSync(filePath, JSON.stringify(keyboardActions));
fs.writeFileSync('../server/applications/star-citizen-missing-keybinds.txt', actionsWithoutKeybinds.join("\n"));