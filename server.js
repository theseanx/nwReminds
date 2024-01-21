const express = require("express");
const webpush = require("web-push");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

// Set static path
app.use(express.static(path.join(__dirname, "client")));

app.use(bodyParser.json());

const publicVapidKey =
  "BJ8NBEgdl89k71YbzUGwKAYdbZF97XobHNUlNiX8xjDD5YEHkXxbv_JrC7pgkPAZkiFtdqy6EY7JKmn9NQJcitY";
const privateVapidKey = "3AysE1150GFoHijLeC3mmJGftO0cZGROeSiTalMiSpE";

webpush.setVapidDetails(
  "mailto:test@test.com",
  publicVapidKey,
  privateVapidKey
);

// Subscribe Route
app.post("/subscribe", (req, res) => {
  // Get pushSubscription object
  const subscription = req.body;

  // Send 201 - resource created
  res.status(201).json({});

  // Create payload
  const payload = JSON.stringify({ title: "Push Test" });

  // Pass object into sendNotification
  webpush
    .sendNotification(subscription, payload)
    .catch(err => console.error(err));
});

const { MongoClient } = require('mongodb');
//const WebSocket = require('ws');
//const http = require('http');

// Add this line after the app.use(express.json());
app.use(express.static('public'));

//const link = "http://localhost:";
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


app.get('/', async (req, res) => {
    res.send('Hello, this is your website!');
  });
  
  // Start the server after connecting to the database
  connectToDatabase().then(() => {
    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  });
  
  