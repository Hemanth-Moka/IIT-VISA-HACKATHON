/**
 * CardInput Component
 * Handles masked Visa card input with validation
 */

import { useState } from 'react';
import '../styles/CardInput.css';

function CardInput({ onSubmit, loading, t }) {
  const [cardNumber, setCardNumber] = useState('');
  const [error, setError] = useState('');

  /**
   * Formats card number with spaces (4111 XXXX XXXX 1111)
   */
  const formatCardNumber = (value) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, '');
    
    // Limit to 16 digits
    const limited = digits.slice(0, 16);
    
    // Format with spaces every 4 digits
    const formatted = limited.replace(/(.{4})/g, '$1 ').trim();
    
    return formatted;
  };

  /**
   * Validates card number
   */
  const validateCard = (card) => {
    const cleanCard = card.replace(/\s/g, '');
    
    if (!cleanCard) {
      return { valid: false, error: t('cardInput.error.required') };
    }
    
    if (!cleanCard.startsWith('4')) {
      return { valid: false, error: t('cardInput.error.prefix') };
    }
    
    if (cleanCard.length !== 16) {
      return { valid: false, error: t('cardInput.error.length') };
    }
    
    return { valid: true };
  };

  /**
   * Handles input change
   */
  const handleChange = (e) => {
    const formatted = formatCardNumber(e.target.value);
    setCardNumber(formatted);
    setError(''); // Clear error on input
  };

  /**
   * Handles form submission
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const validation = validateCard(cardNumber);
    
    if (!validation.valid) {
      setError(validation.error);
      return;
    }
    
    onSubmit(cardNumber);
  };

  return (
    <div className="card-input-container">
      <h2>{t('cardInput.title')}</h2>
      <form onSubmit={handleSubmit} className="card-input-form">
        <div className="input-wrapper">
          <input
            type="text"
            value={cardNumber}
            onChange={handleChange}
            placeholder={t('cardInput.placeholder')}
            className={`card-input ${error ? 'error' : ''}`}
            maxLength={19} // 16 digits + 3 spaces
            disabled={loading}
          />
          {error && <span className="error-message">{error}</span>}
        </div>
        <button 
          type="submit" 
          className="submit-button"
          disabled={loading || !cardNumber.trim()}
        >
          {loading ? t('cardInput.validating') : t('cardInput.submit')}
        </button>
      </form>
    </div>
  );
}

export default CardInput;

