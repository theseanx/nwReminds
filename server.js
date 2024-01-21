const express = require("express");
const webpush = require("web-push");
const bodyParser = require("body-parser");
const path = require("path");
const {MongoClient} = require("mongodb");
const user = require("./routes/user.js");
const app = express();

app.use(express.static(path.join(__dirname, "client")));

app.use(bodyParser.json());


app.use(express.json());
const port = 3000;
const uri = 'mongodb://127.0.0.1:27017'; // Replace with your MongoDB connection string
const client = new MongoClient(uri);

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
  });
  


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

app.use(express.static('public'));




//const user = require('./routes/user.js');



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
// everything followed by the colon is a parameter, things in the json are the body

// editActivity:
// issue: some activities have multiple words, but the endpoint URL only accepts one continous word for the activity
// OK: ".../exampleUser/activity"
// NOT OK: ".../exampleUser/multiple word activity"
// this is working for single word activities only
app.put('/db/userlist/:username/:activity', user.editActivity);
app.delete('/db/userlist/:username/:activity', user.removeActivity);
app.get('/db/userlist/:username', user.getAllActivities);

app.get('/db/userlist/:username/:soreArea', user.getSoreArea);

// Start the server after connecting to the database
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
      res.sendFile(path.join(__dirname, 'index.html'));
    });
    
    // Start the server after connecting to the database
    connectToDatabase().then(() => {
      app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`);
      });
    });