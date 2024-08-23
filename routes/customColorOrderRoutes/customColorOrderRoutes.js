const express = require('express');
const router = express.Router();

const { customColorOrder, getCustomColorOrder, getCustomOrderById } = require('../../controller/customColorOrderControl/customColorOrderControl'); // Correct path


router.post('/api/bilvani/create/customcolororder', customColorOrder);

router.get('/api/bilvani/get/customcolororder', getCustomColorOrder);

router.get('/api/bilvani/get/customcolororder/:orderId', getCustomOrderById);


module.exports = router;
