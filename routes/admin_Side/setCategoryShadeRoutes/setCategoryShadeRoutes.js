const express = require('express');
const router = express.Router();
const { postProduct , getAllProducts } = require('../../../controller/admin_Side/setCategoryShade/setCategoryShadeControll'); 

router.post('/', postProduct);
router.get('/get', getAllProducts);

module.exports = router;
