const {MongoClient} = require('mongodb');
const uri = 'mongodb://127.0.0.1:27017'; // Replace with your MongoDB connection string
const client = new MongoClient(uri);

const createNewUser = async (req, res) => {
    try {
    
      // Access the database
      const database = client.db('UserDB'); // Replace with your actual database name
      const collection = database.collection('userlist');
  
  
      // Insert the new user into the collection
      const result = await collection.insertOne(req.body);
  
      // Respond with success message
      res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  module.exports = {
    createNewUser,
  }