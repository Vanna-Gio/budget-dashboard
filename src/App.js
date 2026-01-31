import { useEffect, useState } from 'react';
import './App.css';
import BudgetCard from './components/BudgetCard';
import './components/BudgetCard.css';
import { budgetStats } from './data/mockData';

function App() {
  const [filter, setFilter] = useState('all'); // State: 'all' , 'Positive',
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([])

  // Simulate API call 
  useEffect (() => {
    setIsLoading(true);

    // Simulate network delay
    setTimeout(() => {
      setData(budgetStats);
      setIsLoading(false)
    }, 1500); // 1.5 second delay
  }, []);

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
              All ({data.length})
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
      {/* Loading State */}
      {isLoading && (
        <div className='loading-container'>
          <div className='spinner'></div>
          <p>Loading budget data...</p>
        </div>
      )}
      {/* Empty state */}
      {!isLoading && filteredStats.length === 0 && (
        <div className='empty-state'>
          <div className='empty-icon'>📊</div>
          <h2>No results found</h2>
          <p>Try adjusting your filters to see more data.</p>
        </div>
      )}

      {/* Cards Grid */}
      {!isLoading && filteredStats.length > 0 && (
        <div className='card-grid'>
          {filteredStats.map((stat) => (
            <BudgetCard 
              key={stat.id}
              {...stat}
              />
          ))}
        </div>
      )}
      
    </div>
  );
}

export default App;