const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
app.use(express.json());
const link = "http://localhost:"
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
app.put('/db/userlist/:username', user.updateUser);

app.post('/db/userlist/:username/feelings', user.addFeelings);
app.get('/db/userlist/:username/name', user.getName);
app.get('/db/userlist/:username/feelings', user.getFeelings);

// working
app.post('/db/userlist/:username/activity', user.addActivity);

// editActivity:
// issue: some activities have multiple words, but the endpoint URL only accepts one continous word for the activity
// OK: ".../exampleUser/activity"
// NOT OK: ".../exampleUser/multiple word activity"
// this is working for single word activities only
app.put('/db/userlist/:username/:activity', user.editActivity);


app.delete('/db/userlist/:username/:activity', user.removeActivity);

app.get('/db/userlist/:username/:soreArea', user.getSoreArea);

// Start the server after connecting to the database
connectToDatabase().then(() => {
  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
});


/*
async function addFeelings(username, feelings) {
    const address = link + port + "/db/userlist/" + username + "/feelings";

    const response = await fetch(address, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "feelings": feelings
        })
    });

}
*/