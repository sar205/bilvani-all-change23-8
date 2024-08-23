const Product = require('../../../mongodb/admin_Side/setCategoryShadeMongo/setCategoryShadeMongo'); // Path to your Mongoose model

// Controller function to handle the POST request
const postProduct = async (req, res) => {
  try {
    const { name, mrp, discountPrice } = req.body;
    const images = req.files.map(file => file.filename);

    const newProduct = new Product({
      name,
      mrp,
      discountPrice,
      images,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json({ success: true, data: savedProduct });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


const getAllProducts = async (req, res) => {
  try {
  
    const products = await Product.find(); 

    
    if (products.length === 0) {
      return res.status(404).json({ success: false, message: 'No products found' });
    }

   
    res.status(200).json({ success: true, data: products });
  } catch (error) {

    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  postProduct,
  getAllProducts
};


