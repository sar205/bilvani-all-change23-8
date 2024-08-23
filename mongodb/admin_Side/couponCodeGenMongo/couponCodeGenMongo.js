const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  couponCode: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  expiryTime: {
    type: Date,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  createTime: {
    type: Date,
    required: true,
    default: Date.now // Automatically set to the current date and time
  }
});

const Coupon = mongoose.model('Coupon', couponSchema);

module.exports = Coupon;
