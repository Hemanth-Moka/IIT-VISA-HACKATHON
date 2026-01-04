# Visa Benefits AI Agent

## Problem Statement

An AI-powered agent that proactively surfaces relevant Visa card benefits to users based on their profile, spending patterns, and location. The system analyzes available benefits, simplifies complex terms, recommends the most valuable benefit, and provides translations in multiple languages.

## Architecture

```
┌─────────────────┐         ┌──────────────────┐         ┌─────────────────┐
│                 │         │                  │         │                 │
│   React + Vite  │────────▶│  Node.js +       │────────▶│  Mock Visa      │
│   Frontend      │  HTTP   │  Express API     │         │  Benefits JSON  │
│                 │         │                  │         │                 │
│  - Card Input   │         │  - Validation    │         │  - Card Types   │
│  - Dashboard    │         │  - AI Service    │         │  - Benefits     │
│  - Recommendations│       │  - Recommendations│        │  - Categories   │
│  - i18n (EN/TA) │         │                  │         │                 │
│                 │         │                  │         │                 │
└─────────────────┘         └──────────────────┘         └─────────────────┘
                                      │
                                      │
                           ┌──────────────────┐
                           │                  │
                           │   AI Service     │
                           │   (Mock GPT)     │
                           │                  │
                           │  - Simplification│
                           │  - Recommendation│
                           │  - Translation   │
                           │                  │
                           └──────────────────┘
```

## Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **CSS3** - Styling with modern gradients and animations
- **i18n** - English and Tamil translations

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **CORS** - Cross-origin resource sharing

### Data & AI
- **Mock JSON** - Visa benefits data (no database)
- **Mock AI Service** - Simulates GPT-like responses for:
  - Benefit simplification
  - Personalized recommendations
  - Language translation

## Privacy & Compliance

🔒 **CRITICAL PRIVACY FEATURES:**

1. **No Card Data Storage**
   - Card numbers are never stored
   - All processing is in-memory only
   - No database connections
   - No persistence layer

2. **Card Number Masking**
   - Frontend displays masked format: `4111 XXXX XXXX 1111`
   - Backend receives masked numbers
   - Validation happens without storing

3. **Clear Disclaimers**
   - Visible disclaimer banner on all pages
   - Footer disclaimer
   - API responses include disclaimer
   - "For awareness only. No real card data stored."

4. **Mock Data Only**
   - No real Visa APIs
   - All benefits are mock data
   - Card validation is basic (format only)
   - Clearly marked as demo

## Project Structure

```
visa-ai-benefits/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── CardInput.jsx          # Masked card input with validation
│   │   │   ├── BenefitsDashboard.jsx  # Grid display of all benefits
│   │   │   └── RecommendationBox.jsx  # AI-powered recommendation
│   │   ├── i18n/
│   │   │   ├── en.json                # English translations
│   │   │   └── ta.json                # Tamil translations
│   │   ├── styles/
│   │   │   ├── App.css
│   │   │   ├── CardInput.css
│   │   │   ├── BenefitsDashboard.css
│   │   │   ├── RecommendationBox.css
│   │   │   └── index.css
│   │   ├── App.jsx                    # Main app component
│   │   └── main.jsx                   # Entry point
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── backend/
│   ├── routes/
│   │   └── benefits.js                # API endpoints
│   ├── ai/
│   │   └── aiService.js               # Mock AI agent logic
│   ├── mockData/
│   │   └── visaBenefits.json          # Mock benefits data
│   ├── index.js                       # Server entry point
│   └── package.json
│
├── README.md
└── demo.md
```

## Installation & Setup

### Prerequisites
- Node.js 16+ and npm/yarn
- Modern web browser

### Backend Setup

```bash
cd backend
npm install
npm start
```

Backend runs on `http://localhost:3001`

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:3000`

## API Endpoints

### POST `/api/benefits`

Get benefits for a Visa card.

**Request Body:**
```json
{
  "cardNumber": "4111 XXXX XXXX 1111",
  "userProfile": {
    "profile": "Student",
    "location": "IIT Chennai",
    "spending": "food, travel, fuel"
  },
  "language": "en"
}
```

**Response:**
```json
{
  "success": true,
  "cardType": "Visa Platinum",
  "benefits": [...],
  "recommendation": {
    "benefit": {...},
    "explanation": "...",
    "estimatedSavings": "₹500/month"
  },
  "disclaimer": "For awareness only. No real card data stored."
}
```

### GET `/api/health`

Health check endpoint.

## Features

### 1. Card Input
- Masked input format: `4111 XXXX XXXX 1111`
- Real-time validation
- Visa card validation (starts with 4, 16 digits)

### 2. User Profile
- Profile type: Student / Professional
- Location input (default: IIT Chennai)
- Spending patterns input

### 3. Benefits Dashboard
- Grid layout with icons
- Category-based organization
- Simplified explanations
- Terms and conditions

### 4. AI Recommendations
- Personalized benefit ranking
- Best benefit highlighting
- Real-life examples
- Estimated savings calculation

### 5. Multi-language Support
- English (en)
- Tamil (ta)
- Toggle between languages

## Demo Flow

See `demo.md` for step-by-step demo script.

## Hackathon Ready

✅ Clean, commented code
✅ Production-ready structure
✅ Error handling
✅ Responsive design
✅ Accessibility considerations
✅ Clear documentation
✅ Privacy-first approach

## License

MIT License - Demo purposes only

## Disclaimer

**FOR AWARENESS ONLY. NO REAL CARD DATA STORED.**

This is a demonstration application. All card data is processed in-memory only and never persisted. No real Visa APIs are used. All benefits data is mock data for demo purposes.

