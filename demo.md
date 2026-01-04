# Demo Script - Visa Benefits AI Agent

## Pre-Demo Setup (2 minutes)

1. **Start Backend**
   ```bash
   cd backend
   npm install
   npm start
   ```
   ✅ Verify: `http://localhost:3001/api/health` returns healthy

2. **Start Frontend** (new terminal)
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   ✅ Verify: Browser opens `http://localhost:3000`

## Demo Flow (5-7 minutes)

### Step 1: Introduction (30 seconds)

**Say:**
> "Today I'm demoing an AI-powered agent that proactively surfaces Visa card benefits. The system uses AI to analyze benefits, simplify complex terms, and recommend the best benefit based on user profile."

**Show:**
- Header: "Visa Benefits AI Agent"
- Disclaimer banner: "For awareness only. No real card data stored."
- Language toggle (English/Tamil)

---

### Step 2: User Profile Setup (1 minute)

**Say:**
> "First, let's set up the user profile. This helps the AI personalize recommendations."

**Action:**
1. Profile Type: Select **"Student"**
2. Location: Keep **"IIT Chennai"** (or type it)
3. Spending Patterns: Keep **"food, travel, fuel"** (or type it)

**Highlight:**
> "These inputs help the AI understand the user's lifestyle and spending habits."

---

### Step 3: Card Input (1 minute)

**Say:**
> "Now, let's enter a Visa card number. Notice the masked input format - we never store card numbers."

**Action:**
1. Click in the card input field
2. Type: `4111111111111111`
3. Show how it formats to: `4111 1111 1111 1111`
4. Click "Get Benefits"

**Highlight:**
- Real-time formatting
- Validation (must start with 4, 16 digits)
- Masked display

---

### Step 4: AI Recommendation (1-2 minutes)

**Say:**
> "The AI analyzes all benefits and surfaces the most relevant one. Let me show you the recommendation."

**Show:**
- **Recommendation Box** (highlighted in purple gradient)
- Badge: "🏆 Fuel Surcharge Waiver"
- Explanation: "Since you frequently travel between hostel and city..."
- Estimated Savings: "₹500/month (₹6000/year)"

**Explain:**
> "The AI considered:
> - User is a Student
> - Location: IIT Chennai
> - Spending: food, travel, fuel
> 
> It ranked benefits and determined Fuel Surcharge Waiver is most valuable because students travel frequently, and this saves ₹500/month."

---

### Step 5: Benefits Dashboard (1-2 minutes)

**Say:**
> "Here are all available benefits. Each benefit has been simplified by the AI so it's easy to understand."

**Scroll through benefits:**
1. **Fuel Surcharge Waiver**
   - Category: Fuel
   - Simple explanation in plain language
   
2. **Dining Benefits**
   - Category: Food
   - Student-friendly explanation
   
3. **Railway Booking Discount**
   - Category: Travel
   - Relevant for IIT students

**Highlight:**
- Grid layout with icons
- Simplified explanations (no jargon)
- Categories clearly marked

---

### Step 6: Language Toggle (1 minute)

**Say:**
> "The system supports multiple languages. Let me switch to Tamil."

**Action:**
1. Click "Tamil" button
2. Show interface translates
3. Scroll to see benefits in Tamil
4. Show recommendation in Tamil

**Highlight:**
> "All content, including AI explanations, is translated. This makes the system accessible to Tamil-speaking users."

---

### Step 7: Change Profile (Optional - 1 minute)

**Say:**
> "Let me show how recommendations change based on profile."

**Action:**
1. Change Profile Type to **"Professional"**
2. Change Spending to **"travel, dining, lifestyle"**
3. Re-enter card (or explain that recommendations would change)
4. Show how AI would recommend different benefits (e.g., Airport Lounge Access for professionals)

**Highlight:**
> "The AI adapts recommendations based on user context. Professionals get different recommendations than students."

---

## Key Points to Emphasize

### Privacy & Security
1. **No Storage**: "Notice the disclaimer - we never store card data. Everything is processed in-memory only."
2. **Masked Input**: "Card numbers are masked throughout the system."
3. **No Real APIs**: "This is a demo using mock data. No real Visa APIs are used."

### AI Capabilities
1. **Simplification**: "Complex benefit terms are explained in simple language a student can understand."
2. **Personalization**: "Recommendations are tailored to user profile and spending patterns."
3. **Multi-language**: "AI-powered translation ensures accessibility."

### Technical Highlights
1. **Clean Architecture**: "Separated frontend and backend, mock AI service, no database."
2. **Production Ready**: "Error handling, validation, responsive design."
3. **Hackathon Ready**: "Fully functional, documented, deployable."

---

## Q&A Preparation

### Potential Questions:

**Q: How does the AI work?**
> A: "We use a mock AI service that simulates GPT-like behavior. It uses rule-based logic with scoring algorithms to rank benefits, simplify language, and generate recommendations. In production, this would integrate with OpenAI or similar."

**Q: How do you handle card security?**
> A: "We don't store card numbers at all. All processing is in-memory. The frontend masks input, and the backend processes without persistence. This is clearly stated in our disclaimers."

**Q: Can this scale?**
> A: "The architecture supports scaling. The mock AI service can be replaced with real APIs. We could add caching, rate limiting, and database storage for non-sensitive data if needed."

**Q: Why no database?**
> A: "This is a hackathon demo focusing on the AI agent logic and user experience. A database would be added in production for caching, analytics, and user preferences (without card data)."

---

## Demo Tips

✅ **Practice the flow** - Run through it once before the actual demo
✅ **Highlight disclaimers** - Emphasize privacy features
✅ **Show both languages** - Demonstrate Tamil support
✅ **Explain AI logic** - Help judges understand the reasoning
✅ **Keep it concise** - Aim for 5-7 minutes, leave time for Q&A

---

## Troubleshooting

**Backend won't start:**
- Check if port 3001 is available
- Verify Node.js version (16+)
- Check `npm install` completed

**Frontend won't start:**
- Check if port 3000 is available
- Verify all dependencies installed
- Check browser console for errors

**API errors:**
- Verify backend is running
- Check CORS settings
- Verify card number format

**Language not changing:**
- Clear browser cache
- Check i18n JSON files are loaded
- Verify language state updates

