const Contact = require('../../mongodb/contactUsMongo/contactUsMongo');


exports.contact = async (req, res) => {
    try {
    
        const { name, email, message, subject } = req.body;
    
        
        const newContact = new Contact({
          name,
          email,
          message,
          subject
        });
    
       
        await newContact.save();
    
     
        res.status(201).json({ message: 'Contact form submitted successfully!' });
      } catch (error) {
       
        console.error('Error submitting contact form:', error);
        res.status(500).json({ error: 'An error occurred while processing your request.' });
      }
};

