const Coupon = require('../../../mongodb/admin_Side/couponCodeGenMongo/couponCodeGenMongo');

// Create a new coupon
exports.createCoupon = async (req, res) => {
  try {
    const { name, couponCode, duration, durationUnit, price } = req.body;

    // Validate input data
    if (!name || !couponCode || !duration || !durationUnit || !price) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if the coupon code already exists
    const existingCoupon = await Coupon.findOne({ couponCode });
    if (existingCoupon) {
      return res.status(400).json({ message: 'Coupon code already exists' });
    }

    // Calculate the expiry time based on the current time and duration
    let expiryTime;
    const currentTime = Date.now(); // Get the current time in milliseconds

    if (durationUnit === 'seconds') {
      expiryTime = new Date(currentTime + duration * 1000); // Convert seconds to milliseconds
    } else if (durationUnit === 'minutes') {
      expiryTime = new Date(currentTime + duration * 60 * 1000); // Convert minutes to milliseconds
    } else if (durationUnit === 'hours') {
      expiryTime = new Date(currentTime + duration * 60 * 60 * 1000); // Convert hours to milliseconds
    } else {
      return res.status(400).json({ message: 'Invalid duration unit. Use "seconds", "minutes", or "hours".' });
    }

    // Create a new coupon object
    const newCoupon = new Coupon({
      name,
      couponCode,
      expiryTime, // Set the calculated expiry time
      price,
      createTime: currentTime // Automatically set createTime to the current date and time
    });

    // Save the coupon to the database
    const savedCoupon = await newCoupon.save();

    return res.status(201).json(savedCoupon);
  } catch (error) {
    console.error('Error creating coupon:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Get all coupons or a specific coupon by code
exports.getCoupons = async (req, res) => {
  try {
      const { couponCode } = req.query;

      if (couponCode) {
          // Find the coupon by the provided code
          const coupon = await Coupon.findOne({ couponCode });

          if (!coupon) {
              return res.status(404).json({ message: 'Invalid coupon code' });
          }

          // Check if the coupon is expired
          const currentTime = new Date();
          if (coupon.expiryTime < currentTime) {
              return res.status(400).json({ message: 'Expired coupon code' });
          }

          return res.status(200).json(coupon);
      } else {
          // Return an error message if no couponCode is provided
          return res.status(400).json({ message: 'Coupon code is required' });
      }
  } catch (error) {
      console.error('Error fetching coupons:', error);
      return res.status(500).json({ message: 'Server error' });
  }
};



// Get a single coupon by ID
exports.getCouponById = async (req, res) => {
  try {
    const { id } = req.params;
    const coupon = await Coupon.findById(id);

    if (!coupon) {
      return res.status(404).json({ message: 'Coupon not found' });
    }

    return res.status(200).json(coupon);
  } catch (error) {
    console.error('Error fetching coupon:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Update a coupon by ID
exports.updateCoupon = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, duration, durationUnit, price } = req.body;

    
    // Calculate the new expiry time if duration is provided
    let expiryTime;
    const currentTime = Date.now();

    if (durationUnit === 'seconds') {
      expiryTime = new Date(currentTime + duration * 1000);
    } else if (durationUnit === 'minutes') {
      expiryTime = new Date(currentTime + duration * 60 * 1000);
    } else if (durationUnit === 'hours') {
      expiryTime = new Date(currentTime + duration * 60 * 60 * 1000);
    } else {
      return res.status(400).json({ message: 'Invalid duration unit. Use "seconds", "minutes", or "hours".' });
    }

    // Find the coupon by ID and update it
    const updatedCoupon = await Coupon.findByIdAndUpdate(
      id,
      { name, expiryTime, price },
      { new: true, runValidators: true }
    );

    if (!updatedCoupon) {
      return res.status(404).json({ message: 'Coupon not found' });
    }

    return res.status(200).json(updatedCoupon);
  } catch (error) {
    console.error('Error updating coupon:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Delete a coupon by ID
exports.deleteCoupon = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCoupon = await Coupon.findByIdAndDelete(id);

    if (!deletedCoupon) {
      return res.status(404).json({ message: 'Coupon not found' });
    }

    return res.status(200).json({ message: 'Coupon deleted successfully' });
  } catch (error) {
    console.error('Error deleting coupon:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};
