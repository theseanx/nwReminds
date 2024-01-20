const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
app.use(express.json());
const port = 3000;
const uri = 'mongodb://127.0.0.1:27017'; // Replace with your MongoDB connection string
const client = new MongoClient(uri);

const user = require('./routes/user.js');

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

// REST API ENDPOINTS ========================================
app.get('/', async (req, res) => {
    res.send('Hello, this is your website!');
});

app.post('/db/userlist', user.createNewUser);

// Start the server after connecting to the database
connectToDatabase().then(() => {
  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
});
