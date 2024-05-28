const express = require('express');
const router = new express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { secret } = require('../config');
const User = require('../models/User');



// Register a new user
router.post('/register', async (req, res) => {
  let { firstName, lastName, email, phone, password, role } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }
    password=await bcrypt.hash(password,10)
    user = new User({ firstName, lastName, email, phone, password, role });
    await user.save();
    res.json({msg:"Registeration done"})
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Login user
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }
    const isMatch = await bcrypt.compare(password,user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }
    delete user._doc.password
    user={...user._doc,"token":jwt.sign({"_id":user.id}, secret, { expiresIn: 360000 })}
    res.json(user)

  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
