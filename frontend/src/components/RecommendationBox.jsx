

import '../styles/RecommendationBox.css';

function RecommendationBox({ recommendation, t }) {
  if (!recommendation || !recommendation.benefit) {
    return null;
  }

  const { benefit, explanation, estimatedSavings } = recommendation;

  return (
    <div className="recommendation-box">
      <div className="recommendation-header">
        <h2>{t('recommendation.title')}</h2>
        <span className="sparkle-icon">✨</span>
      </div>
      
      <div className="recommended-benefit">
        <div className="benefit-badge">
          <span className="badge-icon">🏆</span>
          <span className="badge-text">{benefit.name}</span>
        </div>
        
        <div className="recommendation-explanation">
          <p className="explanation-text">{explanation}</p>
        </div>
        
        {estimatedSavings && (
          <div className="estimated-savings">
            <span className="savings-label">{t('recommendation.savings')}:</span>
            <span className="savings-value">{estimatedSavings}</span>
          </div>
        )}
        
        <div className="recommendation-details">
          <div className="detail-item">
            <span className="detail-label">{t('dashboard.category')}:</span>
            <span className="detail-value">{benefit.category}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">{t('dashboard.terms')}:</span>
            <span className="detail-value">{benefit.terms}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecommendationBox;

