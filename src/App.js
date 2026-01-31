import { useEffect, useState } from 'react';
import './App.css';
import BudgetCard from './components/BudgetCard';
import { budgetStats } from './data/mockData';
import LoadingSpinner from './components/LoadingSpinner';
import EmptyState from './components/EmptyState';

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
      {isLoading && <LoadingSpinner />}
      
    
      {/* Empty state */}
      {!isLoading && filteredStats.length === 0 && <EmptyState /> }
        

      {/* Cards Grid */}
      {!isLoading && filteredStats.length > 0 && (
        <div className='card-grid'>
          {filteredStats.map((stat, index) => (
            <BudgetCard 
              key={stat.id}
              {...stat}
              index={index} // pass array index to component
              />
          ))}
        </div>
      )}
      
    </div>
  );
}

export default App;