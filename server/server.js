const { WebSocketServer } = require('ws');
const http = require('http');
const { v4: uuidv4 } = require('uuid');

// Spinning the HTTP server and the WebSocket server.
const server = http.createServer();
const wsServer = new WebSocketServer({ server });
const port = 5000;
server.listen(port, () => {
	console.log(`WebSocket server is running on port ${port}`);
});

// I'm maintaining all active connections in this object
const clients = {};

// A new client connection request received
wsServer.on('connection', function (connection) {
	// Generate a unique code for every user
	const userId = uuidv4();
	console.log(`Recieved a new connection.`);

	// Store the new connection and handle messages
	clients[userId] = connection;
	console.log(`${userId} connected.`);

	let app = null;

	connection.on('message', function (json) {
		const message = JSON.parse(json);
		console.log(message);
		switch (message.type) {
			case "getApp":
				app = require(`./applications/${message.data.name}.json`);
				connection.send(JSON.stringify({ type: 'app', data: app }));
				break;
			case "action":
				const keybind = app.commands[message.data.action] || "no keybind";
				connection.send(JSON.stringify({ type: 'actionResponse', data: { pannel: 0, keybind: keybind } }));
				break;
		}
	});

	connection.on('close', function () {
		console.log(`${userId} disconnected.`);
		delete clients[userId];
	});
});