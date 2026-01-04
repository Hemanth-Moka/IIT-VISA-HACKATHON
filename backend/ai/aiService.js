/**
 * AI Service - Mock OpenAI-style AI agent for benefit analysis
 * Simulates GPT-like responses for benefit simplification, recommendations, and translations
 */

/**
 * Simplifies benefit terms using AI-style reasoning
 */
function simplifyBenefit(benefit) {
  const simpleExplanations = {
    "Airport Lounge Access": "You can use fancy waiting areas at airports for free while waiting for your flight. Think of it as a comfortable space with free snacks and WiFi instead of crowded terminal seats.",
    "Fuel Surcharge Waiver": "When you fill petrol, there's usually an extra charge (surcharge). With this benefit, you don't have to pay that extra charge, so you save money every time you refuel.",
    "Dining Benefits": "When you eat at certain restaurants, you get some money back. It's like getting a discount after you've paid, automatically credited to your card.",
    "Travel Insurance": "If something goes wrong during your trip (like lost luggage or medical emergency), the insurance company will cover the costs up to a certain amount.",
    "Movie Ticket Discount": "You can watch movies for less money. Sometimes you get one ticket free when you buy another, or you get a discount on the ticket price.",
    "Online Shopping Cashback": "When you shop online, a small percentage of what you spend comes back to you as money. It's like getting a refund on every purchase.",
    "Gym Membership Discount": "You pay less money to join a gym or fitness center. Instead of the full price, you get a discount on the membership fee.",
    "Railway Booking Discount": "When you book train tickets online through IRCTC, you pay less than the normal price. This helps save money on travel."
  };

  return simpleExplanations[benefit.name] || benefit.description || benefit.terms;
}

/**
 * Translates text to Tamil (mock translation service)
 */
function translateToTamil(text) {
  const translations = {
    "You can use fancy waiting areas at airports for free while waiting for your flight. Think of it as a comfortable space with free snacks and WiFi instead of crowded terminal seats.": "விமான நிலையங்களில் உங்கள் விமானத்திற்காக காத்திருக்கும்போது, இலவசமாக லக்ஷரி காத்திருப்பு பகுதிகளைப் பயன்படுத்தலாம். நெரிசலான டெர்மினல் இடங்களுக்குப் பதிலாக இலவச சிற்றுண்டிகள் மற்றும் WiFi உள்ள வசதியான இடம் என்று நினைத்துப் பாருங்கள்.",
    "When you fill petrol, there's usually an extra charge (surcharge). With this benefit, you don't have to pay that extra charge, so you save money every time you refuel.": "பெட்ரோலை நிரப்பும்போது, வழக்கமாக கூடுதல் கட்டணம் (சர்ச்சார்ஜ்) இருக்கும். இந்த நன்மையுடன், அந்த கூடுதல் கட்டணத்தை நீங்கள் செலுத்த வேண்டியதில்லை, எனவே ஒவ்வொரு முறை எரிபொருளை நிரப்பும்போதும் பணத்தைச் சேமிக்கிறீர்கள்.",
    "When you eat at certain restaurants, you get some money back. It's like getting a discount after you've paid, automatically credited to your card.": "குறிப்பிட்ட உணவகங்களில் சாப்பிடும்போது, சில பணம் திரும்ப கிடைக்கும். நீங்கள் பணம் செலுத்திய பிறகு தள்ளுபடி கிடைப்பது போன்றது, தானாகவே உங்கள் கார்டுக்கு வழங்கப்படும்.",
    "Since you frequently travel between hostel and city, the fuel surcharge waiver can save you ₹500/month.": "நீங்கள் அடிக்கடி விடுதிக்கும் நகரத்திற்கும் இடையில் பயணிப்பதால், எரிபொருள் சர்ச்சார்ஜ் விடுப்பு மாதத்திற்கு ₹500 சேமிக்க உதவும்.",
    "Best Benefit For You": "உங்களுக்கான சிறந்த நன்மை",
    "This benefit is most useful for you because": "இந்த நன்மை உங்களுக்கு மிகவும் பயனுள்ளதாகும், ஏனெனில்"
  };

  return translations[text] || text;
}

/**
 * Analyzes benefits and recommends the best one based on user profile
 */
function recommendBestBenefit(benefits, userProfile) {
  const { profile, location, spending } = userProfile;
  
  // Scoring algorithm based on user profile
  const benefitScores = benefits.map(benefit => {
    let score = 0;
    const category = benefit.category.toLowerCase();
    const name = benefit.name.toLowerCase();

    // Profile-based scoring
    if (profile === "Student") {
      if (category === "food" || name.includes("dining")) score += 30;
      if (category === "fuel") score += 25;
      if (category === "travel" && name.includes("railway")) score += 20;
      if (category === "entertainment") score += 15;
      if (name.includes("movie")) score += 20;
      if (category === "shopping" && name.includes("online")) score += 10;
    } else if (profile === "Professional") {
      if (category === "travel" && name.includes("lounge")) score += 30;
      if (category === "travel" && name.includes("insurance")) score += 25;
      if (category === "food" && name.includes("fine")) score += 20;
      if (category === "lifestyle") score += 15;
    }

    // Location-based scoring (IIT Chennai)
    if (location && location.includes("Chennai")) {
      if (category === "fuel") score += 15; // Students travel frequently
      if (category === "food") score += 10;
      if (category === "travel") score += 10;
    }

    // Spending pattern-based scoring
    if (spending) {
      const spendingLower = spending.toLowerCase();
      if (spendingLower.includes("food") && category === "food") score += 20;
      if (spendingLower.includes("travel") && category === "travel") score += 20;
      if (spendingLower.includes("fuel") && category === "fuel") score += 20;
    }

    return { benefit, score };
  });

  // Sort by score and get the best one
  benefitScores.sort((a, b) => b.score - a.score);
  const bestBenefit = benefitScores[0].benefit;

  // Generate recommendation explanation
  let explanation = "This benefit is most useful for you because ";
  
  if (profile === "Student") {
    if (bestBenefit.category === "Fuel") {
      explanation += "you frequently travel between hostel and city. The fuel surcharge waiver can save you ₹500/month, which adds up to ₹6000/year - perfect for covering your travel expenses!";
    } else if (bestBenefit.category === "Food") {
      explanation += "as a student, you dine out regularly. This cashback benefit helps you save money on every restaurant visit, making your budget stretch further.";
    } else if (bestBenefit.category === "Travel" && bestBenefit.name.includes("Railway")) {
      explanation += "you travel by train frequently to go home or explore. This discount on IRCTC bookings can save you significant money over the year.";
    }
  } else {
    explanation += "your professional lifestyle involves frequent travel and business needs. This benefit aligns perfectly with your spending patterns and offers maximum value.";
  }

  // Calculate estimated savings
  let estimatedSavings = "";
  if (bestBenefit.name.includes("Fuel")) {
    estimatedSavings = "₹500/month (₹6000/year)";
  } else if (bestBenefit.name.includes("Dining") || bestBenefit.name.includes("Cashback")) {
    estimatedSavings = "₹300-500/month (₹3600-6000/year)";
  } else if (bestBenefit.name.includes("Railway")) {
    estimatedSavings = "₹200-400/month (₹2400-4800/year)";
  } else {
    estimatedSavings = "Varies based on usage";
  }

  return {
    benefit: bestBenefit,
    explanation,
    estimatedSavings,
    rank: 1
  };
}

/**
 * Main AI service function - processes benefits for a user
 */
function processBenefits(benefits, userProfile, language = "en") {
  // Simplify all benefits
  const simplifiedBenefits = benefits.map(benefit => ({
    ...benefit,
    simpleExplanation: simplifyBenefit(benefit)
  }));

  // Get recommendation
  const recommendation = recommendBestBenefit(benefits, userProfile);

  // Translate if Tamil is requested
  if (language === "ta") {
    simplifiedBenefits.forEach(benefit => {
      benefit.simpleExplanation = translateToTamil(benefit.simpleExplanation);
      benefit.name = translateToTamil(benefit.name) || benefit.name;
    });
    recommendation.explanation = translateToTamil(recommendation.explanation);
  }

  return {
    benefits: simplifiedBenefits,
    recommendation
  };
}

module.exports = {
  processBenefits,
  simplifyBenefit,
  translateToTamil,
  recommendBestBenefit
};

