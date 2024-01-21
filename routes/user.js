const {MongoClient} = require('mongodb');
const uri = 'mongodb://127.0.0.1:27017'; // Replace with your MongoDB connection string
const client = new MongoClient(uri);

const database = client.db('UserDB'); // Replace with your actual database name
const collection = database.collection('userlist');

const createNewUser = async (req, res) => {
    try {
      // Insert the new user into the collection
      const existingUser = await collection.findOne({ username: req.body.username });
      console.log(existingUser);

      if (existingUser) {
        res.status(200).json({message: 'User already exists'});

      } else {
        await collection.insertOne(req.body);
        res.status(201).json({ message: 'User created successfully' });
      }
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

const updateUser = async (req, res) => {
    try {

        const username = req.params.username;

        const result = await collection.updateOne({ username: username }, { $set: req.body });

        if (result.modifiedCount === 1) {
            res.status(201).json({ message: 'User updated successfully' });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
const addFeelings = async (req, res) => {
    try {
        const username = req.params.username;
        const feelingsValue = parseInt(req.body.feelings);

        const user = await collection.findOne({ username: username });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (isNaN(feelingsValue) || feelingsValue < 1 || feelingsValue > 10) {
            return res.status(400).json({ error: 'Invalid feelings value. It should be an integer between 1 and 10.' });
        }

        const currentTime = new Date();
        const feelingsEntry = { timestamp: currentTime, value: feelingsValue };

        // Update the user document in the MongoDB collection
        await collection.updateOne({ username: username }, { $push: { feelings: feelingsEntry } });

        res.status(201).json({ message: 'Feelings added successfully' });
    } catch (error) {
        console.error('Error adding feelings:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getFeelings = async (req, res) => {
    try {
        const username = req.params.username;

        const user = await collection.findOne({ username: username });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const userFeelings = user.feelings || [];

        res.status(200).json({ username: user.username, feelings: userFeelings });
    } catch (error) {
        console.error('Error retrieving feelings:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

    
};

const getName = async (req, res) => {
    try {
        const username = req.params.username;

        const user = await collection.findOne({ username: username });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const userName = user.name || 'No Name'; // Assuming 'name' is a field in the user document

        res.status(200).json({ username: user.username, name: userName });
    } catch (error) {
        console.error('Error retrieving user name:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const addActivity = async (req, res) => {
    try {
        // code here
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const editActivity = async (req, res) => {
    try {
        // code here
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const removeActivity = async (req, res) => {
    try {
        // code here
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
  
  module.exports = {
    createNewUser,
    updateUser,
    addFeelings,
    getFeelings,
    getName,
    addActivity,
    editActivity,
    removeActivity,
  }