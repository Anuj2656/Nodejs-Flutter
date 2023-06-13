
const express = require('express');
const User = require('../models/user.model');
const router = express.Router();

router.post('/signup', (req, res) => {
  const { name,email, mobileNumber ,password, subscription,} = req.body;
  const serverAddress = req.connection.remoteAddress;

//validate name
const nameRegex = /^[a-zA-Z\s]+$/;

  if (!name) {
    return res.status(400).json({ error: 'Please enter your name' });
  }else if (!nameRegex.test(name)) {
    return res.status(400).json({ error: 'Enter a valid name' });
  }

  // Validate email
  if (!email) {
    return res.status(400).json({ error: 'Please enter your email' });
  }
  const mobileNumberRegex = /^[0-9]{10}$/;
  if (!mobileNumber) {
    return res.status(400).json({ error: 'Please enter your mobile number' });
  } else if (!mobileNumberRegex.test(mobileNumber)) {
    return res.status(400).json({ error: 'Invalid mobile number' });
  }

  if (!password) {
    return res.status(400).json({ error: 'Please enter your password' });
  }

  // Validate subscription option
  const validSubscriptions = ['CRM', 'SRM', 'Entrepreneur'];
  if (!subscription) {
    return res.status(400).json({ error: 'Please enter Subscription' });
  } else if (!validSubscriptions.includes(subscription)) {
    return res.status(400).json({ error: 'Please select a valid subscription option' });
  }
  // Validate mobile number
  

  User.findOne({ email }, (err, user) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      if (user) {
        res.status(409).json({ message: 'Email already exists' });
      } else {
        const newUser = new User({
          name,
          email,
          mobileNumber,
          password,
          subscription,
          serverAddress,
        });

        newUser.save((err, savedUser) => {
          if (err) {
            console.log(err);
            res.status(500).json({ error: 'Internal server error' });
          } else {
            console.log(savedUser);
            res.status(201).json(savedUser);
          }
        });
      }
    }
  });
});

router.post('/signin', (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email }, (err, user) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      if (!user) {
        res.status(404).json({ message: 'User not found' });
      } else if (user.password !== password) {
        res.status(401).json({ message: 'Incorrect password' });
      } else {
        res.status(200).json(user);
      }
    }
  });
});

module.exports = router;
