const mongoose = require('mongoose');

const PropertySchema = new mongoose.Schema({
  _id:{
    type:String

  },
  title: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  area: {
    type: String,
    required: true,
  },
  bedrooms: {
    type: String,
    required: true,
  },
  bathrooms: {
    type: String,
    required: true,
  },
  rent: {
    type: String,
    required: true,
  },
  amenities: {
    type: String,
  },
  sellerid: {
    type:String,
    required:true,
  },
  sellername: {
    type:String,
    required:true,
  },
  sellerphone: {
    type:String,
    required:true,
  },
  likes: {
    type: [],
  },
});

module.exports = mongoose.model('Property', PropertySchema);
