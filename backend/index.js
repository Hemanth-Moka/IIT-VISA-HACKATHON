/**
 * Visa Benefits API Server
 * Backend server for AI-powered Visa card benefits demo
 * 
 * PRIVACY: No card data is stored or persisted
 * All processing is in-memory only
 */

const express = require('express');
const cors = require('cors');
const benefitsRouter = require('./routes/benefits');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors()); // Enable CORS for frontend
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// API Routes
app.use('/api', benefitsRouter);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Visa Benefits API - AI Agent Demo',
    version: '1.0.0',
    disclaimer: 'For awareness only. No real card data stored.',
    endpoints: {
      health: 'GET /api/health',
      benefits: 'POST /api/benefits'
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: err.message,
    disclaimer: 'For awareness only. No real card data stored.'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Not found',
    disclaimer: 'For awareness only. No real card data stored.'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`\n🚀 Visa Benefits API Server running on http://localhost:${PORT}`);
  console.log(`📋 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🔒 Privacy: No card data is stored or persisted\n`);
});

module.exports = app;

