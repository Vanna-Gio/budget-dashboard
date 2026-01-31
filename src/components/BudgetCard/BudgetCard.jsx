import PropTypes from 'prop-types';
import './BudgetCard.css';

function BudgetCard({ id, icon, title, amount, growth, growthPositive, index, onClick }) {
  
  const handleCardClick = () => {
    onClick({ id, icon, title, amount, growth, growthPositive });
  };

  return (
    <div 
      className="budget-card" 
      onClick={handleCardClick}
      style={{ '--index': index }}
    >
      <div className="card-header">
        <span className="icon">{icon}</span>
        <span className="title">{title}</span>
      </div>
      <div className="amount">{amount}</div>
      <div className={`growth ${growthPositive ? 'positive' : 'negative'}`}>
        {growth}
      </div>
    </div>
  );
}

BudgetCard.propTypes = {
  id: PropTypes.number.isRequired,
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  amount: PropTypes.string.isRequired,
  growth: PropTypes.string.isRequired,
  growthPositive: PropTypes.bool,
  index: PropTypes.number,
  onClick: PropTypes.func
};

BudgetCard.defaultProps = {
  growthPositive: true,
  index: 0,
  onClick: () => {}
};

export default BudgetCard;