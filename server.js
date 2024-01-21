const express = require('express');
const { MongoClient } = require('mongodb');
const WebSocket = require('ws');
const http = require('http');

const app = express();
app.use(express.json());
// Add this line after the app.use(express.json());
app.use(express.static('public'));

const link = "http://localhost:";
const port = 3000;
const uri = 'mongodb://127.0.0.1:27017'; // Replace with your MongoDB connection string
const client = new MongoClient(uri);

//const user = require('./routes/user.js');

// Connect to the MongoDB database before starting the server
async function connectToDatabase() {
  try {
    await client.connect();
    console.log('Connected to the database');
  } catch (error) {
    console.error('Error connecting to the database:', error);
    process.exit(1); // Terminate the process if unable to connect to the database
  }
}

// Create an HTTP server
const server = http.createServer(app);

// Create a WebSocket server attached to the HTTP server
const wss = new WebSocket.Server({ server });

// WebSocket server logic
wss.on('connection', (ws) => {
  console.log('WebSocket connection established');

  // Handle messages from clients
  ws.on('message', (message) => {
    console.log(`Received message: ${message}`);
    // Handle the message as needed
  });

  // Send a welcome message to the client
  ws.send('Welcome to the WebSocket server!');
});

// REST API ENDPOINTS ========================================
app.get('/', async (req, res) => {
  res.send('Hello, this is your website!');
});

// Start the server after connecting to the database
connectToDatabase().then(() => {
  server.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
});

