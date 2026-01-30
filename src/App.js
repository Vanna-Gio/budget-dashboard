import { useState } from 'react';
import './App.css';
import BudgetCard from './components/BudgetCard';
import './components/BudgetCard.css';
import { budgetStats } from './data/mockData';

function App() {
  const [filter, setFilter] = useState('all'); // State: 'all' , 'Positive',

  //Filter logic 
  const filteredStats = budgetStats.filter((stat) => {
    if (filter === 'all') return true;
    if (filter === 'positive') return stat.growthPositive === true;
    if (filter === 'negative') return stat.growthPositive === false;
    return true;
  });
  return (
    <div className="App">
      <div className='header' >
        <h1>Budget Dashboard</h1>
        <div className="filter-buttons">
          <button 
            className={filter === 'all' ? 'active' : ''}
            onClick={() => setFilter('all')}
            >
              All ({budgetStats.length})
            </button>
          <button 
            className={filter === 'positive' ? 'active' : ''}
            onClick={() => setFilter('positive')}
            >
              Growth 
            </button>
          <button 
            className={filter === 'negative' ? 'active' : ''}
            onClick={() => setFilter('negative')}
            >
              Declining
            </button>
        </div>
      </div>
      <div className='card-grid'>
        {filteredStats.map((stat) => (
          <BudgetCard
            key={stat.id}
            {...stat}
            />
        )
        )}
      </div>
    </div>
  );
}

export default App;