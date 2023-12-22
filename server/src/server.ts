import WebSocket from 'ws';
import { v4 as uuidv4 } from 'uuid';
import { Keyboard } from './hid';

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

	let app: any = null;
	let actions: any = [];

	ws.on('message', async function (json: string) {
		const message = JSON.parse(json);
		console.log(message);
		switch (message.type) {
			case "getApp":
				app = require(`../applications/${message.data.name}.json`);
				actions = require(`../applications/${message.data.name}-keybinds.json`);
				ws.send(JSON.stringify({ type: 'app', data: app }));
				break;
			case "action":
				console.log("action");

				//const keybind = app.commands[message.data.action] || "no keybind";
				const action = actions.find((keybind: any) => keybind.action === message.data.action);
				const keybind = action.keybind;

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
		}
	});

	ws.on('close', function () {
		console.log(`${userId} disconnected.`);
		delete clients[userId];
	});
});

console.log('Server started.');