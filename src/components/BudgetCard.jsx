function BudgetCard() {
    return (
        <div className="budget-card">
            <div className="card-header">
                <span className="icon">💰</span>
                <span className="title">Total Budget</span>

            </div>
            <div className="amount">$2,450,000</div>
             <div className="growth">+12.5% from last quarter</div>
        </div>
    );
}

export default BudgetCard;