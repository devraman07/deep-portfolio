import express from 'express';
import contactController from '../controllers/contactController.js';
import validateContact from '../middlewares/validateContact.js';
import { contactFormLimiter } from '../middlewares/rateLimiter.js';

const router = express.Router();

// POST /api/contact - Handle contact form submissions
router.post('/contact', contactFormLimiter, validateContact, contactController);

// GET /api/health - Health check endpoint
router.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
  });
});

export default router;
