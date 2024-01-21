const express = require('express');
const { MongoClient } = require('mongodb');
const WebSocket = require('ws'); // Import the 'ws' library

const app = express();
app.use(express.json());
const port = 3000;
const uri = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(uri);

const user = require('./routes/user.js');

// Connect to the MongoDB database before starting the server
async function connectToDatabase() {
  try {
    await client.connect();
    console.log('Connected to the database');
  } catch (error) {
    console.error('Error connecting to the database:', error);
    process.exit(1);
  }
}

// Create a WebSocket server alongside your Express server
const server = app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

const wss = new WebSocket.Server({ server }); // Create a WebSocket server

// WebSocket endpoint
wss.on('connection', (ws) => {
  console.log('Client connected to WebSocket');

  // Send a welcome message to the connected client
  ws.send('Welcome to the WebSocket server');

  // Handle messages from clients
  ws.on('message', (message) => {
    console.log(`Received message from client: ${message}`);
  });

  // Handle disconnecting clients
  ws.on('close', () => {
    console.log('Client disconnected from WebSocket');
  });
});

// REST API ENDPOINTS
app.get('/', async (req, res) => {
  res.send('Hello, this is your website!');
});

app.post('/db/userlist', user.createNewUser);

// Start the server after connecting to the database
connectToDatabase().then(() => {
  // The server is already started, no need to call app.listen() again
});
