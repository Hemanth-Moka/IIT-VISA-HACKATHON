/**
 * Benefits API Routes
 * Handles Visa card benefit requests
 * NO card data is stored - all processing is in-memory only
 */

const express = require('express');
const router = express.Router();
const visaBenefits = require('../mockData/visaBenefits.json');
const { processBenefits } = require('../ai/aiService');

/**
 * Validates if a card number is a valid Visa card
 * Rules: Starts with 4, length 16 digits
 */
function validateVisaCard(cardNumber) {
  // Remove spaces and dashes
  const cleanCard = cardNumber.replace(/\s|-/g, '');
  
  // Check if starts with 4
  if (!cleanCard.startsWith('4')) {
    return { valid: false, error: 'Card must start with 4 for Visa' };
  }
  
  // Check length (16 digits)
  if (cleanCard.length !== 16) {
    return { valid: false, error: 'Card number must be 16 digits' };
  }
  
  // Check if all are digits
  if (!/^\d+$/.test(cleanCard)) {
    return { valid: false, error: 'Card number must contain only digits' };
  }
  
  return { valid: true };
}

/**
 * Determines card type based on card number
 * Mock logic: Uses first 4 digits to determine type
 */
function determineCardType(cardNumber) {
  const cleanCard = cardNumber.replace(/\s|-/g, '');
  const firstFour = cleanCard.substring(0, 4);
  
  // Mock card type determination
  // In reality, this would use BIN (Bank Identification Number) lookup
  if (firstFour.startsWith('4111')) {
    return 'Visa Platinum';
  } else if (firstFour.startsWith('4112')) {
    return 'Visa Signature';
  } else {
    return 'Visa Platinum'; // Default to Platinum for demo
  }
}

/**
 * POST /api/benefits
 * Returns benefits for a given Visa card
 * 
 * Request body:
 * {
 *   cardNumber: "4111 XXXX XXXX 1111",
 *   userProfile: {
 *     profile: "Student" | "Professional",
 *     location: "IIT Chennai",
 *     spending: "food, travel, fuel"
 *   },
 *   language: "en" | "ta"
 * }
 */
router.post('/benefits', (req, res) => {
  try {
    const { cardNumber, userProfile, language = 'en' } = req.body;

    // Validate input
    if (!cardNumber) {
      return res.status(400).json({ 
        error: 'Card number is required',
        disclaimer: 'For awareness only. No real card data stored.'
      });
    }

    if (!userProfile || !userProfile.profile) {
      return res.status(400).json({ 
        error: 'User profile is required',
        disclaimer: 'For awareness only. No real card data stored.'
      });
    }

    // Validate Visa card
    const validation = validateVisaCard(cardNumber);
    if (!validation.valid) {
      return res.status(400).json({ 
        error: validation.error,
        disclaimer: 'For awareness only. No real card data stored.'
      });
    }

    // Determine card type
    const cardType = determineCardType(cardNumber);
    
    // Get benefits for card type
    const benefits = visaBenefits[cardType] || visaBenefits['Visa Platinum'];
    
    if (!benefits || benefits.length === 0) {
      return res.status(404).json({ 
        error: 'No benefits found for this card type',
        disclaimer: 'For awareness only. No real card data stored.'
      });
    }

    // Process benefits through AI service
    const processedData = processBenefits(benefits, userProfile, language);

    // Return response (NO card data in response)
    res.json({
      success: true,
      cardType,
      benefits: processedData.benefits,
      recommendation: processedData.recommendation,
      disclaimer: 'For awareness only. No real card data stored.',
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error processing benefits request:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: error.message,
      disclaimer: 'For awareness only. No real card data stored.'
    });
  }
});

/**
 * GET /api/health
 * Health check endpoint
 */
router.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy',
    service: 'Visa Benefits API',
    disclaimer: 'For awareness only. No real card data stored.'
  });
});

module.exports = router;

