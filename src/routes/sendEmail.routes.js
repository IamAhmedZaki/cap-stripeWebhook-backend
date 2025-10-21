const express = require('express');
const router = express.Router();
const { workflowStatusChange,sendCapEmail, stripePayment, getSessionDetails,stripeWebhook, emailTester } = require('../controllers/sendEmail.controller');
// const upload = require('../middlewares/uploadOrderFiles');
// const { authenticate } = require('../middlewares/auth.middleware');



router.put('/workflow/:id', workflowStatusChange);
router.post('/capconfigurator', sendCapEmail);
router.post('/create-checkout-session', stripePayment);
router.post('/testEmail', emailTester);
router.get('/checkout-session', getSessionDetails);


module.exports = router;

