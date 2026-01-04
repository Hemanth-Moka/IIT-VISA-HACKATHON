/**
 * BenefitsDashboard Component
 * Displays all available benefits in a card grid layout
 */

import '../styles/BenefitsDashboard.css';

function BenefitsDashboard({ benefits, t }) {
  /**
   * Gets icon emoji based on category
   */
  const getCategoryIcon = (category) => {
    const icons = {
      Travel: '✈️',
      Fuel: '⛽',
      Food: '🍽️',
      Entertainment: '🎬',
      Shopping: '🛒',
      Lifestyle: '💪',
      Insurance: '🛡️'
    };
    return icons[category] || '💳';
  };

  if (!benefits || benefits.length === 0) {
    return (
      <div className="benefits-dashboard">
        <h2>{t('dashboard.title')}</h2>
        <p className="no-benefits">{t('dashboard.noBenefits')}</p>
      </div>
    );
  }

  return (
    <div className="benefits-dashboard">
      <h2>{t('dashboard.title')}</h2>
      <div className="benefits-grid">
        {benefits.map((benefit, index) => (
          <div key={index} className="benefit-card">
            <div className="benefit-header">
              <span className="category-icon">{getCategoryIcon(benefit.category)}</span>
              <h3 className="benefit-name">{benefit.name}</h3>
            </div>
            <div className="benefit-category">
              <span className="category-label">{t('dashboard.category')}:</span>
              <span className="category-value">{benefit.category}</span>
            </div>
            <div className="benefit-terms">
              <span className="terms-label">{t('dashboard.terms')}:</span>
              <span className="terms-value">{benefit.terms}</span>
            </div>
            {benefit.simpleExplanation && (
              <div className="benefit-explanation">
                <p>{benefit.simpleExplanation}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default BenefitsDashboard;

