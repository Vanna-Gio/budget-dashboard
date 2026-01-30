function BudgetCard({ icon, title, amount, growth, growthPositive = true }) {
    return (
        <div className="budget-card">
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

export default BudgetCard;