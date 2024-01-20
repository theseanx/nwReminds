const express = require('express');
const app = express();
const port = 3000;
// const MongoClient = require('mongodb');

// const uri = 'mongodb://127.0.0.1:27017'; // Replace with your MongoDB connection string
// const client = new MongoClient(uri);



// Set up a simple route
app.get('/', (req, res) => {
  res.send('Hello, this is your website!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
