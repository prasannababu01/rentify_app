const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const Property = require('../models/Property');
const User = require('../models/User');
let multer=require("multer")
let {v4:uuidv4}=require("uuid")

// Get all properties
router.get('/', async (req, res) => {
  try {
    const properties = await Property.find();
    res.json(properties);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Post a new property


router.post('/', async (req, res) => {
    
    const newProperty = new Property({...req.body,"_id":uuidv4()});
    try{
    await newProperty.save();
    res.json({msg:"done"});
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Get seller's properties
router.post('/my-properties', async (req, res) => {
  try {
    const properties = await Property.find({ "sellerid":req.body.id });
    res.json(properties);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Update a property
router.post('/update/:id', async (req, res) => {
  try {
    const property = await Property.findByIdAndUpdate({"_id":req.params.id},req.body);
    res.json(property);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Delete a property
router.delete('/del/:id', async (req, res) => {
  try {
    await Property.findByIdAndDelete({"_id":req.params.id})
    res.json({ msg: 'Property removed' });
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Like a property
router.post('/like/:id', async (req, res) => {
  try {
    const property = await Property.findById({"_id":req.params.id});
    if (!property) return res.status(404).json({ msg: 'Property not found' });
    if((property.likes).indexOf(req.body.id)==-1){
      (property.likes).push(req.body.id);
    }
    await property.save();
    res.json(property);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
