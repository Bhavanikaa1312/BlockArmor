const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/User');
const crypto = require('crypto');
const cors = require('cors'); // Import the cors middleware

// Create Express app
const app = express();
app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all routes

// Connect to MongoDB database
mongoose.connect('mongodb+srv://Trago:Trago@cluster0.enq45fu.mongodb.net/BlockArmor?retryWrites=true&w=majority');

// Check MongoDB connection
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB database');
});

// Generate a random secret key
const secretKey = crypto.randomBytes(32).toString('hex');

// Signup endpoint
// Signup endpoint
app.post('/signup', async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
  
    try {
      // Check if a user with the same email already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(409).send('User with this email already exists.');
      }
  
      // If no user with the same email exists, create a new user
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ firstName, lastName, email, password: hashedPassword });
      await user.save();
      res.status(201).send('User created successfully');
    } catch (error) {
      console.error(error);
      res.status(500).send('Error creating user');
    }
  });
  

// Login endpoint
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send('User not found');
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).send('Invalid password');
    }

    const token = jwt.sign({ userId: user._id }, secretKey);
    res.send({ token });
  } catch (error) {
    console.error(error);
    res.status(500).send('Login failed');
  }
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
