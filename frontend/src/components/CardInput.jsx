

import { useState } from 'react';
import '../styles/CardInput.css';

function CardInput({ onSubmit, loading, t }) {
  const [cardNumber, setCardNumber] = useState('');
  const [error, setError] = useState('');

  const formatCardNumber = (value) => {
    const digits = value.replace(/\D/g, '');
    
    const limited = digits.slice(0, 16);
    
    const formatted = limited.replace(/(.{4})/g, '$1 ').trim();
    
    return formatted;
  };

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

  const handleChange = (e) => {
    const formatted = formatCardNumber(e.target.value);
    setCardNumber(formatted);
    setError(''); // Clear error on input
  };

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

