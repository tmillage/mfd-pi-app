import fs from 'fs';
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

//load the default profile
const filePath = 'data/star-citizen/defaultProfile.xml';

data = fs.readFileSync(filePath);

// Parse the XML data
parseString(data.toString(), (parseErr: Error | null, result: any) => {
	if (parseErr) {
		console.error(`Error parsing XML: ${parseErr}`);
		return;
	}

	// Process the parsed XML data here
	const actionMaps = result.profile.actionmap;

	const keyboardActions: any[] = [];

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

	// Write keyboard actions to JSON file
	const filePath = '../server/applications/star-citizen-keybinds.json';
	fs.writeFileSync(filePath, JSON.stringify(keyboardActions));

});