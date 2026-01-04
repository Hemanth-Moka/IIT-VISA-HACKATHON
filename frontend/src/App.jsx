/**
 * Main App Component
 * Visa Benefits AI Agent Demo Application
 */

import { useState } from 'react';
import CardInput from './components/CardInput';
import BenefitsDashboard from './components/BenefitsDashboard';
import RecommendationBox from './components/RecommendationBox';
import './styles/App.css';
import enTranslations from './i18n/en.json';
import taTranslations from './i18n/ta.json';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

function App() {
  const [benefits, setBenefits] = useState(null);
  const [recommendation, setRecommendation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // User profile state
  const [profile, setProfile] = useState('Student');
  const [location, setLocation] = useState('IIT Chennai');
  const [spending, setSpending] = useState('food, travel, fuel');
  
  // Language state
  const [language, setLanguage] = useState('en');
  const translations = language === 'ta' ? taTranslations : enTranslations;
  
  // Translation function
  const t = (key) => {
    const keys = key.split('.');
    let value = translations;
    for (const k of keys) {
      value = value?.[k];
    }
    return value || key;
  };

  /**
   * Fetches benefits from API
   */
  const fetchBenefits = async (cardNumber) => {
    setLoading(true);
    setError(null);
    setBenefits(null);
    setRecommendation(null);

    try {
      const response = await fetch(`${API_URL}/api/benefits`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cardNumber,
          userProfile: {
            profile,
            location,
            spending
          },
          language
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch benefits');
      }

      setBenefits(data.benefits || []);
      setRecommendation(data.recommendation || null);

    } catch (err) {
      console.error('Error fetching benefits:', err);
      setError(err.message || 'Failed to fetch benefits. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handles language toggle
   */
  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    // Refetch benefits if we already have data
    if (benefits) {
      // This would require storing the card number, which we don't do for privacy
      // So we just update the language for future requests
    }
  };

  return (
    <div className="app">
      {/* Header */}
      <header className="app-header">
        <div className="header-content">
          <h1>{t('app.title')}</h1>
          <p className="subtitle">{t('app.subtitle')}</p>
        </div>
        
        {/* Language Toggle */}
        <div className="language-toggle">
          <button
            className={language === 'en' ? 'active' : ''}
            onClick={() => handleLanguageChange('en')}
          >
            {t('language.english')}
          </button>
          <button
            className={language === 'ta' ? 'active' : ''}
            onClick={() => handleLanguageChange('ta')}
          >
            {t('language.tamil')}
          </button>
        </div>
      </header>

      {/* Disclaimer Banner */}
      <div className="disclaimer-banner">
        <p>⚠️ {t('disclaimer')}</p>
      </div>

      {/* Main Content */}
      <main className="app-main">
        {/* User Profile Section */}
        <div className="profile-section">
          <h2>{t('profile.title')}</h2>
          <div className="profile-inputs">
            <div className="profile-field">
              <label>{t('profile.profileType')}</label>
              <select 
                value={profile} 
                onChange={(e) => setProfile(e.target.value)}
                className="profile-select"
              >
                <option value="Student">{t('profile.student')}</option>
                <option value="Professional">{t('profile.professional')}</option>
              </select>
            </div>
            
            <div className="profile-field">
              <label>{t('profile.location')}</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder={t('profile.locationPlaceholder')}
                className="profile-input"
              />
            </div>
            
            <div className="profile-field">
              <label>{t('profile.spending')}</label>
              <input
                type="text"
                value={spending}
                onChange={(e) => setSpending(e.target.value)}
                placeholder={t('profile.spendingPlaceholder')}
                className="profile-input"
              />
            </div>
          </div>
        </div>

        {/* Card Input Section */}
        <CardInput 
          onSubmit={fetchBenefits} 
          loading={loading}
          t={t}
        />

        {/* Error Display */}
        {error && (
          <div className="error-banner">
            <p>❌ {error}</p>
          </div>
        )}

        {/* Recommendation Box */}
        {recommendation && (
          <RecommendationBox recommendation={recommendation} t={t} />
        )}

        {/* Benefits Dashboard */}
        {benefits && (
          <BenefitsDashboard benefits={benefits} t={t} />
        )}
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <p>{t('disclaimer')}</p>
        <p>Visa Benefits AI Agent Demo - Hackathon Ready</p>
      </footer>
    </div>
  );
}

export default App;

