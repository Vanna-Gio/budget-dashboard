import PropTypes from "prop-types";
function BudgetCard({ id, icon, title, amount, growth, growthPositive = true }) {
    
    const handleCardClick= () => {
        console.log(`Card clicked: ${title} - ${amount}`);

    }
    
    
    return (
        <div className="budget-card" onClick={handleCardClick}>
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
// PropTypes - validates props and helps catch bugs
BudgetCard.prototype = {
    id: PropTypes.number.isRequired,
    icon: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    amount: PropTypes.string.isRequired,
    growth: PropTypes.string.isRequired,
    growthPositive: PropTypes.string.isRequired,

};

// Default props - fallback values
BudgetCard.defaultProps = {
    growthPositive: true
}

export default BudgetCard;