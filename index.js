const express = require("express");
const app = express();
const multer = require('multer');
const path = require('path');

const bodyParser = require('body-parser');
const cors = require('cors');
const body = require('body-parser');


require("dotenv").config();

app.use(bodyParser.json());


////! All import of the Mongodb
require('./mongodb/config');
require('./mongodb/signupMongo/signupMongo');
require('./mongodb/savedMixColorMongo/saveMixeColorMongo');
require('./mongodb/otpSave/otpSave');
require('./mongodb/userOrderInfo/userOrderInfoMongo');
require('./mongodb/contactUsMongo/contactUsMongo');
require('./mongodb/productMongo/productMongo');
require('./mongodb/paymentMongo/paymentMongo');
require('./mongodb/addToCartMongo/addToCartMongo');
require('./mongodb/orderConfirmMongo/orderConfirmMongo');
require('./mongodb/cancelOrderMongo/cancelOrderMongo');
require('./mongodb/productCategory/productCategoryMongo');
require('./mongodb/admin_Side/setCategoryShadeMongo/setCategoryShadeMongo');
require('./mongodb/admin_Side/couponCodeGenMongo/couponCodeGenMongo');
require('./mongodb/customColorOrderMongo/customColorOrderMongo');


app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        return callback(null, origin);
    },
    credentials: true,
}));
app.use(body.json())


/////! All routes import 
const colorCodeApi = require('./routes/color_code_api/color_code_api');
const signupController = require('./routes/signupRoutes/signupRoutes');
const signinController = require('./routes/signinRoutes/signinRoutes');
const saveMixColors = require('./routes/saveMixColorRoutes/saveMixColorRoutes');
const verifyEmail = require('./routes/verifyEmail/verifyEmail');
const resendOTP = require('./routes/resendOtp/resendOtp');
const Orderinfo = require('./routes/orderInfoRoute/orderInfoRoute');
const Contact = require('./routes/contactUsRoutes/contactUsRoutes');
const Product = require('./routes/productRoutes/productRoutes');
const payment = require('./routes/paymentRoutes/paymentRoutes');
const addToCart = require('./routes/addToCartRoutes/addToCartRoutes');
const orderConfirmed = require('./routes/orderConfirmRoutes/orderConfirmRoutes');
const cancelOrder = require('./routes/cancelOrderRoutes/cancelOrderRoutes');
const forgotPassword = require('./routes/forgetPasswordRoutes/forgetPasswordRoutes');
const userSignUpInfoControl = require('./routes/userSignUpInfoRoutes/userSignUpInfoRoutes');
const createCategorySubcategory =  require('./routes/productCategorySubcategory/productCategorySubcategoryRoutes');
const setCategoryShade = require('./routes/admin_Side/setCategoryShadeRoutes/setCategoryShadeRoutes');
const CouponCode = require('./routes/admin_Side/couponCodeGenRoutes/couponCodeGenRoutes');
const CustomColorOrder = require('./routes/customColorOrderRoutes/customColorOrderRoutes');



// Multer configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../frontend/public/uploads')); // Save files to the correct folder
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Filename with timestamp
    }
});
const upload = multer({ storage: storage });


app.use('/create-product', upload.array('images', 3), Product);
app.use('/api/category/shade', upload.array('images', 2), setCategoryShade);

app.use("/",Contact)
app.use('/', colorCodeApi);
app.use('/sign-up', signupController);
app.use('/sign-in', signinController)
app.use('/', saveMixColors);
app.use('/verify-email', verifyEmail);
app.use('/resend-otp', resendOTP);
app.use('/', Orderinfo);
app.use('/',payment);
app.use('/', addToCart);
app.use('/',orderConfirmed);
app.use('/',cancelOrder);
app.use('/',forgotPassword);
app.use('/',userSignUpInfoControl);
app.use('/', createCategorySubcategory);
app.use('/', CouponCode);
app.use('/', CustomColorOrder);















const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is starting on port ${PORT}`);
});
