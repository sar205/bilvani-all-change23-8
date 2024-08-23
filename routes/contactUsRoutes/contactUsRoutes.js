const express = require("express");
const { contact } = require("../../controller/contactUsControl/contactUsControl");

const router = express.Router();


router.route('/api/contact-us').post(contact);

module.exports = router;