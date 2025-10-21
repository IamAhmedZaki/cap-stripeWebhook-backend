const express = require("express");
const router = express.Router();
const webhookController = require("../controllers/sendEmail.controller");

// Stripe requires raw body for webhook verification
router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  webhookController.stripeWebhook
);

router.post(
  "/testEmail",
  webhookController.emailTester
);

module.exports = router;
