import WebSocket from 'ws';
import { v4 as uuidv4 } from 'uuid';
import { Keyboard } from './hid';
import {ApplicationDTO} from "shared/DTO";


// Spinning the HTTP server and the WebSocket server.
const wsServer = new WebSocket.Server({ port: 5000 });

// I'm maintaining all active connections in this object
const clients: { [key: string]: WebSocket } = {};

// A new client connection request received
wsServer.on('connection', function (ws: WebSocket) {
	// Generate a unique code for every user
	const userId = uuidv4();
	console.log(`Recieved a new connection.`);

	const keyboard = new Keyboard();

	// Store the new connection and handle messages
	clients[userId] = ws;
	console.log(`${userId} connected.`);

	let app: ApplicationDTO = null;
	let actions: any = [];

	const loadJsonFromFile = (name: string): any => {
		console.log("loadJsonFromFile", name);
		const fs = require('fs');
		const data = fs.readFileSync(`applications/${name}.json`);
		const json = JSON.parse(data.toString());

		return json;
	};

	ws.on('message', async function (json: string) {
		const message = JSON.parse(json);
		console.log(message);
		switch (message.type) {
			case "getApp":
				console.log("getApp");
				//app = loadJsonFromFile(message.data.name);
				actions = loadJsonFromFile(`${message.data.name}-keybinds`);

				console.log("getApp", app.panels);

				ws.send(JSON.stringify({ type: 'app', data: app }));
				break;
			case "action":
				console.log("action");

				let keybind = "";

				if (message.data.action === "keyboard") {
					keybind = message.data.data;
				} else {
					const action = actions.find((keybind: any) => keybind.action === message.data.action);
					keybind = action.keybind;
				}

				if (message.data.type === "start") {
					if (keybind) {
						keyboard.press(keybind.split("+"));
					}
				} else {
					keyboard.press([]);
				}

				ws.send(JSON.stringify(
					{
						type: 'actionResponse',
						data: {
							mfd: message.data.mfd,
							response: `${message.data.type === "start" ? "press" : "release"} ${keybind || "no keybind"}`
						}
					})
				);
				break;
			case "pull":
				console.log("pull");

				const { exec } = require("child_process");
				exec("cd .. && git pull", (error: any, stdout: any, stderr: any) => {
					if (error) {
						console.log(`error: ${error.message}`);
						return;
					}
					if (stderr) {
						console.log(`stderr: ${stderr}`);
						return;
					}
					console.log(`stdout: ${stdout}`);
				});
				break;
		}
	});

	ws.on('close', function () {
		console.log(`${userId} disconnected.`);
		delete clients[userId];
	});
});

console.log('Server started.');