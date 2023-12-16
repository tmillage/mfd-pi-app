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

	connection.on('message', function (message) {
		const data = JSON.parse(message);
		console.log(data);
		if (data.type === 'getApp') {
			const app = require(`./applications/${data.data.name}.json`);
			connection.send(JSON.stringify({ type: 'app', data: app }));
		}
	});

	connection.on('close', function () {
		console.log(`${userId} disconnected.`);
		delete clients[userId];
	});
});